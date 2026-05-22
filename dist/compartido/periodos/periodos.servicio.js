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
exports.PeriodosServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const periodo_academico_entidad_1 = require("../entidades/periodo-academico.entidad");
let PeriodosServicio = class PeriodosServicio {
    constructor(periodoRepo) {
        this.periodoRepo = periodoRepo;
    }
    async crear(dto) {
        const periodo = this.periodoRepo.create(dto);
        return this.mapear(await this.periodoRepo.save(periodo));
    }
    async listar(page, size) {
        const [items, total] = await this.periodoRepo.findAndCount({
            order: { fechaInicio: 'DESC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((p) => this.mapear(p)), total, page, size };
    }
    async buscarPorId(id) {
        const p = await this.periodoRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Periodo ${id} no encontrado`);
        return this.mapear(p);
    }
    async actualizar(id, dto) {
        const p = await this.periodoRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Periodo ${id} no encontrado`);
        Object.assign(p, dto);
        return this.mapear(await this.periodoRepo.save(p));
    }
    async eliminar(id) {
        const p = await this.periodoRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Periodo ${id} no encontrado`);
        await this.periodoRepo.remove(p);
    }
    mapear(p) {
        return { id: p.id, nombre: p.nombre, fechaInicio: p.fechaInicio, fechaFin: p.fechaFin };
    }
};
exports.PeriodosServicio = PeriodosServicio;
exports.PeriodosServicio = PeriodosServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(periodo_academico_entidad_1.PeriodoAcademico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PeriodosServicio);
//# sourceMappingURL=periodos.servicio.js.map