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
exports.FormulariosServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const periodo_academico_entidad_1 = require("../../compartido/entidades/periodo-academico.entidad");
const formulario_entidad_1 = require("../entidades/formulario.entidad");
let FormulariosServicio = class FormulariosServicio {
    constructor(formularioRepo, periodoRepo) {
        this.formularioRepo = formularioRepo;
        this.periodoRepo = periodoRepo;
    }
    async crear(dto) {
        const periodo = await this.periodoRepo.findOne({ where: { id: dto.periodoId } });
        if (!periodo)
            throw new common_1.NotFoundException(`Periodo ${dto.periodoId} no encontrado`);
        const f = this.formularioRepo.create({ titulo: dto.titulo, descripcion: dto.descripcion ?? null, periodo, activo: dto.activo ?? true });
        return this.mapear(await this.formularioRepo.save(f));
    }
    async listar(page, size) {
        const [items, total] = await this.formularioRepo.findAndCount({ order: { id: 'DESC' }, skip: (page - 1) * size, take: size });
        return { items: items.map((f) => this.mapear(f)), total, page, size };
    }
    async buscarPorId(id) {
        const f = await this.formularioRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Formulario ${id} no encontrado`);
        return this.mapear(f);
    }
    async actualizar(id, dto) {
        const f = await this.formularioRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Formulario ${id} no encontrado`);
        if (dto.periodoId !== undefined) {
            const periodo = await this.periodoRepo.findOne({ where: { id: dto.periodoId } });
            if (!periodo)
                throw new common_1.NotFoundException(`Periodo ${dto.periodoId} no encontrado`);
            f.periodo = periodo;
        }
        if (dto.titulo !== undefined)
            f.titulo = dto.titulo;
        if (dto.descripcion !== undefined)
            f.descripcion = dto.descripcion ?? null;
        if (dto.activo !== undefined)
            f.activo = dto.activo;
        return this.mapear(await this.formularioRepo.save(f));
    }
    async eliminar(id) {
        const f = await this.formularioRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Formulario ${id} no encontrado`);
        await this.formularioRepo.remove(f);
    }
    mapear(f) {
        return { id: f.id, titulo: f.titulo, descripcion: f.descripcion, periodoId: f.periodo.id, periodoNombre: f.periodo.nombre, activo: f.activo };
    }
};
exports.FormulariosServicio = FormulariosServicio;
exports.FormulariosServicio = FormulariosServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(formulario_entidad_1.Formulario)),
    __param(1, (0, typeorm_1.InjectRepository)(periodo_academico_entidad_1.PeriodoAcademico)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FormulariosServicio);
//# sourceMappingURL=formularios.servicio.js.map