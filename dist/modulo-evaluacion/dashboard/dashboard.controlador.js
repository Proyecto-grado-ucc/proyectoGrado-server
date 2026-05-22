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
exports.DashboardControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const dashboard_servicio_1 = require("./dashboard.servicio");
const respuesta_dashboard_dto_1 = require("./dto/respuesta-dashboard.dto");
let DashboardControlador = class DashboardControlador {
    constructor(dashboardServicio) {
        this.dashboardServicio = dashboardServicio;
    }
    resumen(periodoId) {
        return this.dashboardServicio.resumen(periodoId);
    }
};
exports.DashboardControlador = DashboardControlador;
__decorate([
    (0, common_1.Get)('resumen'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumen estadístico del período académico' }),
    (0, swagger_1.ApiQuery)({ name: 'periodoId', required: true, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_dashboard_dto_1.RespuestaDashboardDto }),
    __param(0, (0, common_1.Query)('periodoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardControlador.prototype, "resumen", null);
exports.DashboardControlador = DashboardControlador = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_servicio_1.DashboardServicio])
], DashboardControlador);
//# sourceMappingURL=dashboard.controlador.js.map