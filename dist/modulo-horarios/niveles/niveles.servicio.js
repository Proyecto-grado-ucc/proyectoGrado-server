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
exports.NivelesServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nivel_idioma_entidad_1 = require("../entidades/nivel-idioma.entidad");
let NivelesServicio = class NivelesServicio {
    constructor(nivelRepo) {
        this.nivelRepo = nivelRepo;
    }
    async crear(dto) {
        const existe = await this.nivelRepo.findOne({ where: { codigo: dto.codigo } });
        if (existe)
            throw new common_1.ConflictException(`Ya existe un nivel con el código ${dto.codigo}`);
        const nivel = this.nivelRepo.create(dto);
        return this.mapear(await this.nivelRepo.save(nivel));
    }
    async listar(page, size) {
        const [items, total] = await this.nivelRepo.findAndCount({
            order: { codigo: 'ASC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((n) => this.mapear(n)), total, page, size };
    }
    async buscarPorId(id) {
        const n = await this.nivelRepo.findOne({ where: { id } });
        if (!n)
            throw new common_1.NotFoundException(`Nivel ${id} no encontrado`);
        return this.mapear(n);
    }
    async actualizar(id, dto) {
        const n = await this.nivelRepo.findOne({ where: { id } });
        if (!n)
            throw new common_1.NotFoundException(`Nivel ${id} no encontrado`);
        if (dto.codigo && dto.codigo !== n.codigo) {
            const duplicado = await this.nivelRepo.findOne({ where: { codigo: dto.codigo } });
            if (duplicado)
                throw new common_1.ConflictException(`El código ${dto.codigo} ya está en uso`);
        }
        Object.assign(n, dto);
        return this.mapear(await this.nivelRepo.save(n));
    }
    async eliminar(id) {
        const n = await this.nivelRepo.findOne({ where: { id } });
        if (!n)
            throw new common_1.NotFoundException(`Nivel ${id} no encontrado`);
        await this.nivelRepo.remove(n);
    }
    mapear(n) {
        return { id: n.id, codigo: n.codigo, nombre: n.nombre };
    }
};
exports.NivelesServicio = NivelesServicio;
exports.NivelesServicio = NivelesServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nivel_idioma_entidad_1.NivelIdioma)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NivelesServicio);
//# sourceMappingURL=niveles.servicio.js.map