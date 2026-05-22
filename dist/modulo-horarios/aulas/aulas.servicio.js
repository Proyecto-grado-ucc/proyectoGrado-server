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
exports.AulasServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aula_entidad_1 = require("../entidades/aula.entidad");
let AulasServicio = class AulasServicio {
    constructor(aulaRepo) {
        this.aulaRepo = aulaRepo;
    }
    async crear(dto) {
        const existe = await this.aulaRepo.findOne({ where: { codigo: dto.codigo } });
        if (existe)
            throw new common_1.ConflictException(`Ya existe un aula con el código ${dto.codigo}`);
        const aula = this.aulaRepo.create({ ...dto, activa: dto.activa ?? true });
        return this.mapear(await this.aulaRepo.save(aula));
    }
    async listar(page, size) {
        const [items, total] = await this.aulaRepo.findAndCount({
            order: { codigo: 'ASC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((a) => this.mapear(a)), total, page, size };
    }
    async buscarPorId(id) {
        const a = await this.aulaRepo.findOne({ where: { id } });
        if (!a)
            throw new common_1.NotFoundException(`Aula ${id} no encontrada`);
        return this.mapear(a);
    }
    async actualizar(id, dto) {
        const a = await this.aulaRepo.findOne({ where: { id } });
        if (!a)
            throw new common_1.NotFoundException(`Aula ${id} no encontrada`);
        if (dto.codigo && dto.codigo !== a.codigo) {
            const duplicado = await this.aulaRepo.findOne({ where: { codigo: dto.codigo } });
            if (duplicado)
                throw new common_1.ConflictException(`El código ${dto.codigo} ya está en uso`);
        }
        Object.assign(a, dto);
        return this.mapear(await this.aulaRepo.save(a));
    }
    async eliminar(id) {
        const a = await this.aulaRepo.findOne({ where: { id } });
        if (!a)
            throw new common_1.NotFoundException(`Aula ${id} no encontrada`);
        await this.aulaRepo.remove(a);
    }
    mapear(a) {
        return { id: a.id, codigo: a.codigo, capacidad: a.capacidad, tipo: a.tipo, activa: a.activa };
    }
};
exports.AulasServicio = AulasServicio;
exports.AulasServicio = AulasServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aula_entidad_1.Aula)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AulasServicio);
//# sourceMappingURL=aulas.servicio.js.map