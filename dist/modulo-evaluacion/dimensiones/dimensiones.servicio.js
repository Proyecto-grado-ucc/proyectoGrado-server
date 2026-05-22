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
exports.DimensionesServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dimension_entidad_1 = require("../entidades/dimension.entidad");
const formulario_entidad_1 = require("../entidades/formulario.entidad");
let DimensionesServicio = class DimensionesServicio {
    constructor(dimensionRepo, formularioRepo) {
        this.dimensionRepo = dimensionRepo;
        this.formularioRepo = formularioRepo;
    }
    async crear(dto) {
        const formulario = await this.formularioRepo.findOne({ where: { id: dto.formularioId } });
        if (!formulario)
            throw new common_1.NotFoundException(`Formulario ${dto.formularioId} no encontrado`);
        const d = this.dimensionRepo.create({ nombre: dto.nombre, descripcion: dto.descripcion ?? null, peso: dto.peso ?? 1.0, formulario });
        return this.mapear(await this.dimensionRepo.save(d));
    }
    async listar(page, size) {
        const [items, total] = await this.dimensionRepo.findAndCount({ order: { id: 'ASC' }, skip: (page - 1) * size, take: size });
        return { items: items.map((d) => this.mapear(d)), total, page, size };
    }
    async buscarPorId(id) {
        const d = await this.dimensionRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Dimensión ${id} no encontrada`);
        return this.mapear(d);
    }
    async actualizar(id, dto) {
        const d = await this.dimensionRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Dimensión ${id} no encontrada`);
        if (dto.formularioId !== undefined) {
            const formulario = await this.formularioRepo.findOne({ where: { id: dto.formularioId } });
            if (!formulario)
                throw new common_1.NotFoundException(`Formulario ${dto.formularioId} no encontrado`);
            d.formulario = formulario;
        }
        if (dto.nombre !== undefined)
            d.nombre = dto.nombre;
        if (dto.descripcion !== undefined)
            d.descripcion = dto.descripcion ?? null;
        if (dto.peso !== undefined)
            d.peso = dto.peso;
        return this.mapear(await this.dimensionRepo.save(d));
    }
    async eliminar(id) {
        const d = await this.dimensionRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Dimensión ${id} no encontrada`);
        await this.dimensionRepo.remove(d);
    }
    mapear(d) {
        return { id: d.id, nombre: d.nombre, descripcion: d.descripcion, peso: d.peso, formularioId: d.formulario.id, formularioTitulo: d.formulario.titulo };
    }
};
exports.DimensionesServicio = DimensionesServicio;
exports.DimensionesServicio = DimensionesServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dimension_entidad_1.Dimension)),
    __param(1, (0, typeorm_1.InjectRepository)(formulario_entidad_1.Formulario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DimensionesServicio);
//# sourceMappingURL=dimensiones.servicio.js.map