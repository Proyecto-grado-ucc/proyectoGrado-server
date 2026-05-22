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
exports.FranjasServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const franja_horaria_entidad_1 = require("../entidades/franja-horaria.entidad");
let FranjasServicio = class FranjasServicio {
    constructor(franjaRepo) {
        this.franjaRepo = franjaRepo;
    }
    async crear(dto) {
        const franja = this.franjaRepo.create(dto);
        return this.mapear(await this.franjaRepo.save(franja));
    }
    async listar(page, size) {
        const [items, total] = await this.franjaRepo.findAndCount({
            order: { diaSemana: 'ASC', bloqueIdx: 'ASC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((f) => this.mapear(f)), total, page, size };
    }
    async buscarPorId(id) {
        const f = await this.franjaRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Franja horaria ${id} no encontrada`);
        return this.mapear(f);
    }
    async actualizar(id, dto) {
        const f = await this.franjaRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Franja horaria ${id} no encontrada`);
        Object.assign(f, dto);
        return this.mapear(await this.franjaRepo.save(f));
    }
    async eliminar(id) {
        const f = await this.franjaRepo.findOne({ where: { id } });
        if (!f)
            throw new common_1.NotFoundException(`Franja horaria ${id} no encontrada`);
        await this.franjaRepo.remove(f);
    }
    mapear(f) {
        return {
            id: f.id,
            diaSemana: f.diaSemana,
            horaInicio: f.horaInicio,
            horaFin: f.horaFin,
            bloqueIdx: f.bloqueIdx,
        };
    }
};
exports.FranjasServicio = FranjasServicio;
exports.FranjasServicio = FranjasServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(franja_horaria_entidad_1.FranjaHoraria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FranjasServicio);
//# sourceMappingURL=franjas.servicio.js.map