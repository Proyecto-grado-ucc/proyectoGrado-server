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
exports.CursosServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const curso_entidad_1 = require("../entidades/curso.entidad");
const nivel_idioma_entidad_1 = require("../entidades/nivel-idioma.entidad");
let CursosServicio = class CursosServicio {
    constructor(cursoRepo, nivelRepo) {
        this.cursoRepo = cursoRepo;
        this.nivelRepo = nivelRepo;
    }
    async crear(dto) {
        const nivel = await this.nivelRepo.findOne({ where: { id: dto.nivelId } });
        if (!nivel)
            throw new common_1.NotFoundException(`Nivel ${dto.nivelId} no encontrado`);
        const curso = this.cursoRepo.create({ nombre: dto.nombre, nivel, intensidadHoraria: dto.intensidadHoraria });
        return this.mapear(await this.cursoRepo.save(curso));
    }
    async listar(page, size) {
        const [items, total] = await this.cursoRepo.findAndCount({
            order: { nombre: 'ASC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((c) => this.mapear(c)), total, page, size };
    }
    async buscarPorId(id) {
        const c = await this.cursoRepo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException(`Curso ${id} no encontrado`);
        return this.mapear(c);
    }
    async actualizar(id, dto) {
        const c = await this.cursoRepo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException(`Curso ${id} no encontrado`);
        if (dto.nivelId !== undefined) {
            const nivel = await this.nivelRepo.findOne({ where: { id: dto.nivelId } });
            if (!nivel)
                throw new common_1.NotFoundException(`Nivel ${dto.nivelId} no encontrado`);
            c.nivel = nivel;
        }
        if (dto.nombre !== undefined)
            c.nombre = dto.nombre;
        if (dto.intensidadHoraria !== undefined)
            c.intensidadHoraria = dto.intensidadHoraria;
        return this.mapear(await this.cursoRepo.save(c));
    }
    async eliminar(id) {
        const c = await this.cursoRepo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException(`Curso ${id} no encontrado`);
        await this.cursoRepo.remove(c);
    }
    mapear(c) {
        return {
            id: c.id,
            nombre: c.nombre,
            nivelId: c.nivel.id,
            nivelCodigo: c.nivel.codigo,
            intensidadHoraria: c.intensidadHoraria,
        };
    }
};
exports.CursosServicio = CursosServicio;
exports.CursosServicio = CursosServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(curso_entidad_1.Curso)),
    __param(1, (0, typeorm_1.InjectRepository)(nivel_idioma_entidad_1.NivelIdioma)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CursosServicio);
//# sourceMappingURL=cursos.servicio.js.map