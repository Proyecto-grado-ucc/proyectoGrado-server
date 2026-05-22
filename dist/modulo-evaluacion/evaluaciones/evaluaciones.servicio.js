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
exports.EvaluacionesServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const evaluacion_entidad_1 = require("../entidades/evaluacion.entidad");
const formulario_entidad_1 = require("../entidades/formulario.entidad");
let EvaluacionesServicio = class EvaluacionesServicio {
    constructor(evaluacionRepo, formularioRepo, docenteRepo) {
        this.evaluacionRepo = evaluacionRepo;
        this.formularioRepo = formularioRepo;
        this.docenteRepo = docenteRepo;
    }
    async crear(dto) {
        const formulario = await this.formularioRepo.findOne({ where: { id: dto.formularioId } });
        if (!formulario)
            throw new common_1.NotFoundException(`Formulario ${dto.formularioId} no encontrado`);
        const docenteEvaluado = await this.docenteRepo.findOne({ where: { id: dto.docenteEvaluadoId } });
        if (!docenteEvaluado)
            throw new common_1.NotFoundException(`Docente ${dto.docenteEvaluadoId} no encontrado`);
        const e = this.evaluacionRepo.create({ formulario, docenteEvaluado, evaluadorId: dto.evaluadorId ?? null });
        return this.mapear(await this.evaluacionRepo.save(e));
    }
    async listar(page, size) {
        const [items, total] = await this.evaluacionRepo.findAndCount({ order: { creadoEn: 'DESC' }, skip: (page - 1) * size, take: size });
        return { items: items.map((e) => this.mapear(e)), total, page, size };
    }
    async buscarPorId(id) {
        const e = await this.evaluacionRepo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException(`Evaluación ${id} no encontrada`);
        return this.mapear(e);
    }
    async actualizar(id, dto) {
        const e = await this.evaluacionRepo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException(`Evaluación ${id} no encontrada`);
        if (dto.estado !== undefined)
            e.estado = dto.estado;
        return this.mapear(await this.evaluacionRepo.save(e));
    }
    async eliminar(id) {
        const e = await this.evaluacionRepo.findOne({ where: { id } });
        if (!e)
            throw new common_1.NotFoundException(`Evaluación ${id} no encontrada`);
        await this.evaluacionRepo.remove(e);
    }
    mapear(e) {
        return {
            id: e.id,
            formularioId: e.formulario.id,
            formularioTitulo: e.formulario.titulo,
            docenteEvaluadoId: e.docenteEvaluado.id,
            docenteEvaluadoNombre: e.docenteEvaluado.usuario.nombre,
            evaluadorId: e.evaluadorId,
            estado: e.estado,
            creadoEn: e.creadoEn,
        };
    }
};
exports.EvaluacionesServicio = EvaluacionesServicio;
exports.EvaluacionesServicio = EvaluacionesServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluacion_entidad_1.Evaluacion)),
    __param(1, (0, typeorm_1.InjectRepository)(formulario_entidad_1.Formulario)),
    __param(2, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EvaluacionesServicio);
//# sourceMappingURL=evaluaciones.servicio.js.map