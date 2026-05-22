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
exports.DisponibilidadesServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const disponibilidad_entidad_1 = require("../entidades/disponibilidad.entidad");
const franja_horaria_entidad_1 = require("../entidades/franja-horaria.entidad");
let DisponibilidadesServicio = class DisponibilidadesServicio {
    constructor(dispRepo, docenteRepo, franjaRepo) {
        this.dispRepo = dispRepo;
        this.docenteRepo = docenteRepo;
        this.franjaRepo = franjaRepo;
    }
    async crear(dto) {
        const docente = await this.docenteRepo.findOne({ where: { id: dto.docenteId } });
        if (!docente)
            throw new common_1.NotFoundException(`Docente ${dto.docenteId} no encontrado`);
        const franja = await this.franjaRepo.findOne({ where: { id: dto.franjaHorariaId } });
        if (!franja)
            throw new common_1.NotFoundException(`Franja horaria ${dto.franjaHorariaId} no encontrada`);
        const existe = await this.dispRepo.findOne({ where: { docente: { id: dto.docenteId }, franjaHoraria: { id: dto.franjaHorariaId } } });
        if (existe)
            throw new common_1.ConflictException('Ya existe disponibilidad para este docente en esta franja');
        const disp = this.dispRepo.create({ docente, franjaHoraria: franja, disponible: dto.disponible ?? true });
        return this.mapear(await this.dispRepo.save(disp));
    }
    async listar(page, size) {
        const [items, total] = await this.dispRepo.findAndCount({
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((d) => this.mapear(d)), total, page, size };
    }
    async buscarPorId(id) {
        const d = await this.dispRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Disponibilidad ${id} no encontrada`);
        return this.mapear(d);
    }
    async actualizar(id, dto) {
        const d = await this.dispRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Disponibilidad ${id} no encontrada`);
        if (dto.disponible !== undefined)
            d.disponible = dto.disponible;
        return this.mapear(await this.dispRepo.save(d));
    }
    async eliminar(id) {
        const d = await this.dispRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Disponibilidad ${id} no encontrada`);
        await this.dispRepo.remove(d);
    }
    mapear(d) {
        return {
            id: d.id,
            docenteId: d.docente.id,
            docenteNombre: d.docente.usuario.nombre,
            franjaHorariaId: d.franjaHoraria.id,
            diaSemana: d.franjaHoraria.diaSemana,
            horaInicio: d.franjaHoraria.horaInicio,
            horaFin: d.franjaHoraria.horaFin,
            disponible: d.disponible,
        };
    }
};
exports.DisponibilidadesServicio = DisponibilidadesServicio;
exports.DisponibilidadesServicio = DisponibilidadesServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disponibilidad_entidad_1.Disponibilidad)),
    __param(1, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __param(2, (0, typeorm_1.InjectRepository)(franja_horaria_entidad_1.FranjaHoraria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DisponibilidadesServicio);
//# sourceMappingURL=disponibilidades.servicio.js.map