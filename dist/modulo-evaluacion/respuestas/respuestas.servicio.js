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
exports.RespuestasServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evaluacion_entidad_1 = require("../entidades/evaluacion.entidad");
const pregunta_entidad_1 = require("../entidades/pregunta.entidad");
const respuesta_entidad_1 = require("../entidades/respuesta.entidad");
let RespuestasServicio = class RespuestasServicio {
    constructor(respuestaRepo, evaluacionRepo, preguntaRepo) {
        this.respuestaRepo = respuestaRepo;
        this.evaluacionRepo = evaluacionRepo;
        this.preguntaRepo = preguntaRepo;
    }
    async crear(dto) {
        const evaluacion = await this.evaluacionRepo.findOne({ where: { id: dto.evaluacionId } });
        if (!evaluacion)
            throw new common_1.NotFoundException(`Evaluación ${dto.evaluacionId} no encontrada`);
        const pregunta = await this.preguntaRepo.findOne({ where: { id: dto.preguntaId } });
        if (!pregunta)
            throw new common_1.NotFoundException(`Pregunta ${dto.preguntaId} no encontrada`);
        const r = this.respuestaRepo.create({ evaluacion, pregunta, valorNumerico: dto.valorNumerico ?? null, valorTexto: dto.valorTexto ?? null });
        return this.mapear(await this.respuestaRepo.save(r));
    }
    async listarPorEvaluacion(evaluacionId, page, size) {
        const evaluacion = await this.evaluacionRepo.findOne({ where: { id: evaluacionId } });
        if (!evaluacion)
            throw new common_1.NotFoundException(`Evaluación ${evaluacionId} no encontrada`);
        const [items, total] = await this.respuestaRepo.findAndCount({
            where: { evaluacion: { id: evaluacionId } },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((r) => this.mapear(r)), total, page, size };
    }
    async buscarPorId(id) {
        const r = await this.respuestaRepo.findOne({ where: { id } });
        if (!r)
            throw new common_1.NotFoundException(`Respuesta ${id} no encontrada`);
        return this.mapear(r);
    }
    async actualizar(id, dto) {
        const r = await this.respuestaRepo.findOne({ where: { id } });
        if (!r)
            throw new common_1.NotFoundException(`Respuesta ${id} no encontrada`);
        if (dto.valorNumerico !== undefined)
            r.valorNumerico = dto.valorNumerico ?? null;
        if (dto.valorTexto !== undefined)
            r.valorTexto = dto.valorTexto ?? null;
        return this.mapear(await this.respuestaRepo.save(r));
    }
    async eliminar(id) {
        const r = await this.respuestaRepo.findOne({ where: { id } });
        if (!r)
            throw new common_1.NotFoundException(`Respuesta ${id} no encontrada`);
        await this.respuestaRepo.remove(r);
    }
    mapear(r) {
        return {
            id: r.id,
            evaluacionId: r.evaluacion.id,
            preguntaId: r.pregunta.id,
            preguntaTexto: r.pregunta.texto,
            preguntaTipo: r.pregunta.tipo,
            valorNumerico: r.valorNumerico,
            valorTexto: r.valorTexto,
        };
    }
};
exports.RespuestasServicio = RespuestasServicio;
exports.RespuestasServicio = RespuestasServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_entidad_1.Respuesta)),
    __param(1, (0, typeorm_1.InjectRepository)(evaluacion_entidad_1.Evaluacion)),
    __param(2, (0, typeorm_1.InjectRepository)(pregunta_entidad_1.Pregunta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RespuestasServicio);
//# sourceMappingURL=respuestas.servicio.js.map