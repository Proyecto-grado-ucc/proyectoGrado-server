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
exports.GruposServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const curso_entidad_1 = require("../entidades/curso.entidad");
const grupo_entidad_1 = require("../entidades/grupo.entidad");
let GruposServicio = class GruposServicio {
    constructor(grupoRepo, cursoRepo) {
        this.grupoRepo = grupoRepo;
        this.cursoRepo = cursoRepo;
    }
    async crear(dto) {
        const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
        if (!curso)
            throw new common_1.NotFoundException(`Curso ${dto.cursoId} no encontrado`);
        const grupo = this.grupoRepo.create({ codigo: dto.codigo, curso, cupoMax: dto.cupoMax, jornada: dto.jornada });
        return this.mapear(await this.grupoRepo.save(grupo));
    }
    async listar(page, size) {
        const [items, total] = await this.grupoRepo.findAndCount({
            order: { codigo: 'ASC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((g) => this.mapear(g)), total, page, size };
    }
    async buscarPorId(id) {
        const g = await this.grupoRepo.findOne({ where: { id } });
        if (!g)
            throw new common_1.NotFoundException(`Grupo ${id} no encontrado`);
        return this.mapear(g);
    }
    async actualizar(id, dto) {
        const g = await this.grupoRepo.findOne({ where: { id } });
        if (!g)
            throw new common_1.NotFoundException(`Grupo ${id} no encontrado`);
        if (dto.cursoId !== undefined) {
            const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
            if (!curso)
                throw new common_1.NotFoundException(`Curso ${dto.cursoId} no encontrado`);
            g.curso = curso;
        }
        if (dto.codigo !== undefined)
            g.codigo = dto.codigo;
        if (dto.cupoMax !== undefined)
            g.cupoMax = dto.cupoMax;
        if (dto.jornada !== undefined)
            g.jornada = dto.jornada;
        return this.mapear(await this.grupoRepo.save(g));
    }
    async eliminar(id) {
        const g = await this.grupoRepo.findOne({ where: { id } });
        if (!g)
            throw new common_1.NotFoundException(`Grupo ${id} no encontrado`);
        await this.grupoRepo.remove(g);
    }
    mapear(g) {
        return {
            id: g.id,
            codigo: g.codigo,
            cursoId: g.curso.id,
            cursoNombre: g.curso.nombre,
            cupoMax: g.cupoMax,
            jornada: g.jornada,
        };
    }
};
exports.GruposServicio = GruposServicio;
exports.GruposServicio = GruposServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grupo_entidad_1.Grupo)),
    __param(1, (0, typeorm_1.InjectRepository)(curso_entidad_1.Curso)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GruposServicio);
//# sourceMappingURL=grupos.servicio.js.map