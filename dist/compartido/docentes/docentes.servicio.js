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
exports.DocentesServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entidad_1 = require("../../seguridad/entidades/usuario.entidad");
const docente_entidad_1 = require("../entidades/docente.entidad");
let DocentesServicio = class DocentesServicio {
    constructor(docenteRepo, usuarioRepo) {
        this.docenteRepo = docenteRepo;
        this.usuarioRepo = usuarioRepo;
    }
    async crear(dto) {
        const usuario = await this.usuarioRepo.findOne({ where: { id: dto.usuarioId } });
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${dto.usuarioId} no encontrado`);
        const docente = this.docenteRepo.create({
            usuario,
            especialidad: dto.especialidad ?? null,
            cargaMaximaHoras: dto.cargaMaximaHoras ?? 40,
        });
        return this.mapear(await this.docenteRepo.save(docente));
    }
    async listar(page, size) {
        const [items, total] = await this.docenteRepo.findAndCount({
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((d) => this.mapear(d)), total, page, size };
    }
    async buscarPorId(id) {
        const d = await this.docenteRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Docente ${id} no encontrado`);
        return this.mapear(d);
    }
    async actualizar(id, dto) {
        const d = await this.docenteRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Docente ${id} no encontrado`);
        if (dto.usuarioId !== undefined) {
            const usuario = await this.usuarioRepo.findOne({ where: { id: dto.usuarioId } });
            if (!usuario)
                throw new common_1.NotFoundException(`Usuario ${dto.usuarioId} no encontrado`);
            d.usuario = usuario;
        }
        if (dto.especialidad !== undefined)
            d.especialidad = dto.especialidad ?? null;
        if (dto.cargaMaximaHoras !== undefined)
            d.cargaMaximaHoras = dto.cargaMaximaHoras;
        return this.mapear(await this.docenteRepo.save(d));
    }
    async eliminar(id) {
        const d = await this.docenteRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Docente ${id} no encontrado`);
        await this.docenteRepo.remove(d);
    }
    mapear(d) {
        return {
            id: d.id,
            usuarioId: d.usuario.id,
            usuarioNombre: d.usuario.nombre,
            usuarioEmail: d.usuario.email,
            especialidad: d.especialidad,
            cargaMaximaHoras: d.cargaMaximaHoras,
        };
    }
};
exports.DocentesServicio = DocentesServicio;
exports.DocentesServicio = DocentesServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entidad_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DocentesServicio);
//# sourceMappingURL=docentes.servicio.js.map