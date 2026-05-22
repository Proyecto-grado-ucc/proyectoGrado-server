"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KddPipelineServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const alerta_entidad_1 = require("../entidades/alerta.entidad");
const evaluacion_entidad_1 = require("../entidades/evaluacion.entidad");
const resultado_kdd_entidad_1 = require("../entidades/resultado-kdd.entidad");
const respuesta_entidad_1 = require("../entidades/respuesta.entidad");
const UMBRAL_CRITICO = 3.0;
const UMBRAL_ADVERTENCIA = 3.5;
let KddPipelineServicio = class KddPipelineServicio {
    constructor(evalRepo, respRepo, resultadoRepo, alertaRepo, docenteRepo) {
        this.evalRepo = evalRepo;
        this.respRepo = respRepo;
        this.resultadoRepo = resultadoRepo;
        this.alertaRepo = alertaRepo;
        this.docenteRepo = docenteRepo;
    }
    async ejecutar(periodoId) {
        const evaluaciones = await this.evalRepo
            .createQueryBuilder('ev')
            .innerJoin('ev.formulario', 'fm')
            .innerJoin('fm.periodo', 'per')
            .leftJoinAndSelect('ev.docenteEvaluado', 'doc')
            .where('per.id = :periodoId', { periodoId })
            .andWhere('ev.estado = :estado', { estado: evaluacion_entidad_1.EstadoEvaluacion.Completada })
            .getMany();
        if (!evaluaciones.length) {
            await this.resultadoRepo.delete({ periodoId });
            await this.alertaRepo.delete({ periodoId });
            return { resultados: 0, alertas: 0 };
        }
        const evalIds = evaluaciones.map(e => e.id);
        const evalToDocente = new Map(evaluaciones.map(e => [e.id, e.docenteEvaluado.id]));
        const respNumericas = await this.respRepo
            .createQueryBuilder('r')
            .innerJoinAndSelect('r.evaluacion', 'ev')
            .innerJoinAndSelect('r.pregunta', 'preg')
            .innerJoinAndSelect('preg.dimension', 'dim')
            .where('ev.id IN (:...evalIds)', { evalIds })
            .andWhere('r.valor_numerico IS NOT NULL')
            .getMany();
        const docenteData = new Map();
        for (const ev of evaluaciones) {
            const docId = ev.docenteEvaluado.id;
            if (!docenteData.has(docId))
                docenteData.set(docId, { dims: new Map(), evalCount: 0 });
            docenteData.get(docId).evalCount++;
        }
        for (const r of respNumericas) {
            const evalId = r.evaluacion.id;
            const docenteId = evalToDocente.get(evalId);
            if (docenteId === undefined)
                continue;
            const dim = r.pregunta.dimension;
            const data = docenteData.get(docenteId);
            if (!data.dims.has(dim.id)) {
                data.dims.set(dim.id, { nombre: dim.nombre, peso: dim.peso ?? 1.0, valores: [] });
            }
            data.dims.get(dim.id).valores.push(r.valorNumerico);
        }
        const resultadosParaGuardar = [];
        for (const [docenteId, data] of docenteData) {
            if (data.dims.size === 0)
                continue;
            const detalle = {};
            let numerador = 0;
            let denominador = 0;
            for (const dimAccum of data.dims.values()) {
                const prom = dimAccum.valores.reduce((a, b) => a + b, 0) / dimAccum.valores.length;
                detalle[dimAccum.nombre] = Math.round(prom * 100) / 100;
                numerador += prom * dimAccum.peso;
                denominador += dimAccum.peso;
            }
            if (denominador === 0)
                continue;
            resultadosParaGuardar.push(this.resultadoRepo.create({
                periodoId,
                docenteId,
                puntuacionGlobal: Math.round((numerador / denominador) * 100) / 100,
                totalEvaluaciones: data.evalCount,
                detalleDimensiones: detalle,
            }));
        }
        await this.resultadoRepo.delete({ periodoId });
        const savedResultados = await this.resultadoRepo.save(resultadosParaGuardar);
        await this.alertaRepo.delete({ periodoId });
        const alertas = [];
        const docentes = await this.docenteRepo.find();
        const docentesConResultado = new Set(savedResultados.map(r => r.docenteId));
        for (const docente of docentes) {
            if (!docentesConResultado.has(docente.id)) {
                const nombre = docente.usuario?.nombre ?? `ID ${docente.id}`;
                alertas.push(this.alertaRepo.create({
                    docenteId: docente.id,
                    periodoId,
                    tipo: alerta_entidad_1.TipoAlerta.SIN_EVALUACIONES,
                    nivel: alerta_entidad_1.NivelAlerta.INFO,
                    mensaje: `El docente ${nombre} no tiene evaluaciones completadas en este período.`,
                    leida: false,
                }));
            }
        }
        for (const resultado of savedResultados) {
            if (resultado.puntuacionGlobal < UMBRAL_CRITICO) {
                alertas.push(this.alertaRepo.create({
                    docenteId: resultado.docenteId,
                    periodoId,
                    tipo: alerta_entidad_1.TipoAlerta.BAJO_RENDIMIENTO,
                    nivel: alerta_entidad_1.NivelAlerta.CRITICO,
                    mensaje: `Puntuación global ${resultado.puntuacionGlobal.toFixed(2)} por debajo del umbral crítico (${UMBRAL_CRITICO}).`,
                    leida: false,
                }));
            }
            else if (resultado.puntuacionGlobal < UMBRAL_ADVERTENCIA) {
                alertas.push(this.alertaRepo.create({
                    docenteId: resultado.docenteId,
                    periodoId,
                    tipo: alerta_entidad_1.TipoAlerta.BAJO_RENDIMIENTO,
                    nivel: alerta_entidad_1.NivelAlerta.ADVERTENCIA,
                    mensaje: `Puntuación global ${resultado.puntuacionGlobal.toFixed(2)} por debajo del umbral de advertencia (${UMBRAL_ADVERTENCIA}).`,
                    leida: false,
                }));
            }
        }
        await this.alertaRepo.save(alertas);
        return { resultados: savedResultados.length, alertas: alertas.length };
    }
    async listarResultados(periodoId) {
        const resultados = await this.resultadoRepo.find({ where: { periodoId } });
        return resultados.map(r => ({
            id: r.id,
            periodoId: r.periodoId,
            docenteId: r.docenteId,
            puntuacionGlobal: r.puntuacionGlobal,
            totalEvaluaciones: r.totalEvaluaciones,
            detalleDimensiones: r.detalleDimensiones,
            creadoEn: r.creadoEn,
        }));
    }
};
exports.KddPipelineServicio = KddPipelineServicio;
exports.KddPipelineServicio = KddPipelineServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluacion_entidad_1.Evaluacion)),
    __param(1, (0, typeorm_1.InjectRepository)(respuesta_entidad_1.Respuesta)),
    __param(2, (0, typeorm_1.InjectRepository)(resultado_kdd_entidad_1.ResultadoKdd)),
    __param(3, (0, typeorm_1.InjectRepository)(alerta_entidad_1.Alerta)),
    __param(4, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], KddPipelineServicio);
//# sourceMappingURL=kdd-pipeline.servicio.js.map