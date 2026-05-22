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
exports.AuditLogServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entidad_1 = require("../entidades/audit-log.entidad");
let AuditLogServicio = class AuditLogServicio {
    constructor(auditLogRepo) {
        this.auditLogRepo = auditLogRepo;
    }
    async registrar(dto) {
        const entrada = this.auditLogRepo.create({
            usuarioId: dto.usuarioId ?? null,
            accion: dto.accion,
            entidad: dto.entidad,
            entidadId: dto.entidadId ?? null,
            datosPrevios: dto.datosPrevios ?? null,
            datosNuevos: dto.datosNuevos ?? null,
        });
        await this.auditLogRepo.save(entrada);
    }
    async listar(page, size, filtros) {
        const where = {};
        if (filtros.entidad)
            where.entidad = filtros.entidad;
        if (filtros.fechaDesde && filtros.fechaHasta) {
            where.timestamp = (0, typeorm_2.Between)(new Date(filtros.fechaDesde), new Date(filtros.fechaHasta));
        }
        const [items, total] = await this.auditLogRepo.findAndCount({
            where,
            order: { timestamp: 'DESC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items, total, page, size };
    }
};
exports.AuditLogServicio = AuditLogServicio;
exports.AuditLogServicio = AuditLogServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entidad_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogServicio);
//# sourceMappingURL=audit-log.servicio.js.map