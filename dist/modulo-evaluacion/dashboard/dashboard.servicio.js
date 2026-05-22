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
exports.DashboardServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const alerta_entidad_1 = require("../entidades/alerta.entidad");
const evaluacion_entidad_1 = require("../entidades/evaluacion.entidad");
const resultado_kdd_entidad_1 = require("../entidades/resultado-kdd.entidad");
let DashboardServicio = class DashboardServicio {
    constructor(docenteRepo, evalRepo, resultadoRepo, alertaRepo) {
        this.docenteRepo = docenteRepo;
        this.evalRepo = evalRepo;
        this.resultadoRepo = resultadoRepo;
        this.alertaRepo = alertaRepo;
    }
    async resumen(periodoId) {
        const [totalDocentes, totalEvaluaciones, resultados, alertasCriticas, alertasAdvertencia] = await Promise.all([
            this.docenteRepo.count(),
            this.evalRepo
                .createQueryBuilder('ev')
                .innerJoin('ev.formulario', 'fm')
                .innerJoin('fm.periodo', 'per')
                .where('per.id = :periodoId', { periodoId })
                .andWhere('ev.estado = :estado', { estado: evaluacion_entidad_1.EstadoEvaluacion.Completada })
                .getCount(),
            this.resultadoRepo.find({ where: { periodoId } }),
            this.alertaRepo.count({ where: { periodoId, nivel: alerta_entidad_1.NivelAlerta.CRITICO } }),
            this.alertaRepo.count({ where: { periodoId, nivel: alerta_entidad_1.NivelAlerta.ADVERTENCIA } }),
        ]);
        const promedioGlobal = resultados.length > 0
            ? Math.round((resultados.reduce((s, r) => s + r.puntuacionGlobal, 0) / resultados.length) * 100) / 100
            : 0;
        const rangos = ['1.0-2.0', '2.0-3.0', '3.0-4.0', '4.0-5.0'];
        const distribucionPuntuaciones = rangos.map(rango => {
            const [min, max] = rango.split('-').map(Number);
            return {
                rango,
                cantidad: resultados.filter(r => r.puntuacionGlobal >= min && r.puntuacionGlobal < max)
                    .length,
            };
        });
        return {
            totalDocentes,
            totalEvaluaciones,
            promedioGlobal,
            alertasCriticas,
            alertasAdvertencia,
            distribucionPuntuaciones,
        };
    }
};
exports.DashboardServicio = DashboardServicio;
exports.DashboardServicio = DashboardServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __param(1, (0, typeorm_1.InjectRepository)(evaluacion_entidad_1.Evaluacion)),
    __param(2, (0, typeorm_1.InjectRepository)(resultado_kdd_entidad_1.ResultadoKdd)),
    __param(3, (0, typeorm_1.InjectRepository)(alerta_entidad_1.Alerta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardServicio);
//# sourceMappingURL=dashboard.servicio.js.map