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
exports.PreguntasServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dimension_entidad_1 = require("../entidades/dimension.entidad");
const pregunta_entidad_1 = require("../entidades/pregunta.entidad");
let PreguntasServicio = class PreguntasServicio {
    constructor(preguntaRepo, dimensionRepo) {
        this.preguntaRepo = preguntaRepo;
        this.dimensionRepo = dimensionRepo;
    }
    async crear(dto) {
        const dimension = await this.dimensionRepo.findOne({ where: { id: dto.dimensionId } });
        if (!dimension)
            throw new common_1.NotFoundException(`Dimensión ${dto.dimensionId} no encontrada`);
        const p = this.preguntaRepo.create({ texto: dto.texto, tipo: dto.tipo, ordenIdx: dto.ordenIdx ?? 0, dimension });
        return this.mapear(await this.preguntaRepo.save(p));
    }
    async listar(page, size) {
        const [items, total] = await this.preguntaRepo.findAndCount({ order: { ordenIdx: 'ASC' }, skip: (page - 1) * size, take: size });
        return { items: items.map((p) => this.mapear(p)), total, page, size };
    }
    async buscarPorId(id) {
        const p = await this.preguntaRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Pregunta ${id} no encontrada`);
        return this.mapear(p);
    }
    async actualizar(id, dto) {
        const p = await this.preguntaRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Pregunta ${id} no encontrada`);
        if (dto.dimensionId !== undefined) {
            const dimension = await this.dimensionRepo.findOne({ where: { id: dto.dimensionId } });
            if (!dimension)
                throw new common_1.NotFoundException(`Dimensión ${dto.dimensionId} no encontrada`);
            p.dimension = dimension;
        }
        if (dto.texto !== undefined)
            p.texto = dto.texto;
        if (dto.tipo !== undefined)
            p.tipo = dto.tipo;
        if (dto.ordenIdx !== undefined)
            p.ordenIdx = dto.ordenIdx;
        return this.mapear(await this.preguntaRepo.save(p));
    }
    async eliminar(id) {
        const p = await this.preguntaRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Pregunta ${id} no encontrada`);
        await this.preguntaRepo.remove(p);
    }
    mapear(p) {
        return { id: p.id, texto: p.texto, tipo: p.tipo, ordenIdx: p.ordenIdx, dimensionId: p.dimension.id, dimensionNombre: p.dimension.nombre };
    }
};
exports.PreguntasServicio = PreguntasServicio;
exports.PreguntasServicio = PreguntasServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pregunta_entidad_1.Pregunta)),
    __param(1, (0, typeorm_1.InjectRepository)(dimension_entidad_1.Dimension)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PreguntasServicio);
//# sourceMappingURL=preguntas.servicio.js.map