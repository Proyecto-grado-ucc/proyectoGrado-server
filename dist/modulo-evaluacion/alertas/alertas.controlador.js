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
exports.AlertasControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const alertas_servicio_1 = require("./alertas.servicio");
const respuesta_alerta_dto_1 = require("./dto/respuesta-alerta.dto");
let AlertasControlador = class AlertasControlador {
    constructor(alertasServicio) {
        this.alertasServicio = alertasServicio;
    }
    listar(periodoId) {
        return this.alertasServicio.listar(periodoId);
    }
    marcarLeida(id) {
        return this.alertasServicio.marcarLeida(id);
    }
    eliminar(id) {
        return this.alertasServicio.eliminar(id);
    }
};
exports.AlertasControlador = AlertasControlador;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar alertas, opcionalmente filtradas por período' }),
    (0, swagger_1.ApiQuery)({ name: 'periodoId', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [respuesta_alerta_dto_1.RespuestaAlertaDto] }),
    __param(0, (0, common_1.Query)('periodoId', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlertasControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Patch)(':id/leer'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar alerta como leída' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_alerta_dto_1.RespuestaAlertaDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlertasControlador.prototype, "marcarLeida", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar alerta' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlertasControlador.prototype, "eliminar", null);
exports.AlertasControlador = AlertasControlador = __decorate([
    (0, swagger_1.ApiTags)('alertas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('alertas'),
    __metadata("design:paramtypes", [alertas_servicio_1.AlertasServicio])
], AlertasControlador);
//# sourceMappingURL=alertas.controlador.js.map