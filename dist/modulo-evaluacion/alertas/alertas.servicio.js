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
exports.AlertasServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alerta_entidad_1 = require("../entidades/alerta.entidad");
let AlertasServicio = class AlertasServicio {
    constructor(alertaRepo) {
        this.alertaRepo = alertaRepo;
    }
    async listar(periodoId) {
        const where = periodoId ? { periodoId } : {};
        const alertas = await this.alertaRepo.find({ where, order: { creadoEn: 'DESC' } });
        return alertas.map(this.mapear);
    }
    async marcarLeida(id) {
        const alerta = await this.alertaRepo.findOne({ where: { id } });
        if (!alerta)
            throw new common_1.NotFoundException(`Alerta ${id} no encontrada`);
        alerta.leida = true;
        return this.mapear(await this.alertaRepo.save(alerta));
    }
    async eliminar(id) {
        const alerta = await this.alertaRepo.findOne({ where: { id } });
        if (!alerta)
            throw new common_1.NotFoundException(`Alerta ${id} no encontrada`);
        await this.alertaRepo.remove(alerta);
    }
    mapear(a) {
        return {
            id: a.id,
            docenteId: a.docenteId,
            periodoId: a.periodoId,
            tipo: a.tipo,
            nivel: a.nivel,
            mensaje: a.mensaje,
            leida: a.leida,
            creadoEn: a.creadoEn,
        };
    }
};
exports.AlertasServicio = AlertasServicio;
exports.AlertasServicio = AlertasServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alerta_entidad_1.Alerta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlertasServicio);
//# sourceMappingURL=alertas.servicio.js.map