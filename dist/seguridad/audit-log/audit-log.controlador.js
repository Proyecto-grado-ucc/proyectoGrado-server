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
exports.AuditLogControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../auth/guardias/roles.guardia");
const roles_decorador_1 = require("../decoradores/roles.decorador");
const rol_entidad_1 = require("../entidades/rol.entidad");
const audit_log_servicio_1 = require("./audit-log.servicio");
const respuesta_audit_log_dto_1 = require("./dto/respuesta-audit-log.dto");
let AuditLogControlador = class AuditLogControlador {
    constructor(auditLogServicio) {
        this.auditLogServicio = auditLogServicio;
    }
    listar(page = 1, size = 20, entidad, fechaDesde, fechaHasta) {
        return this.auditLogServicio.listar(page, size, { entidad, fechaDesde, fechaHasta });
    }
};
exports.AuditLogControlador = AuditLogControlador;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar audit log paginado y filtrable' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'entidad', required: false, example: 'USUARIO' }),
    (0, swagger_1.ApiQuery)({ name: 'fecha_desde', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fecha_hasta', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_audit_log_dto_1.RespuestaPaginadaAuditLogDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('entidad')),
    __param(3, (0, common_1.Query)('fecha_desde')),
    __param(4, (0, common_1.Query)('fecha_hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AuditLogControlador.prototype, "listar", null);
exports.AuditLogControlador = AuditLogControlador = __decorate([
    (0, swagger_1.ApiTags)('audit-log'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('audit-log'),
    __metadata("design:paramtypes", [audit_log_servicio_1.AuditLogServicio])
], AuditLogControlador);
//# sourceMappingURL=audit-log.controlador.js.map