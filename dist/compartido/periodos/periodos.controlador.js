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
exports.PeriodosControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const actualizar_periodo_dto_1 = require("./dto/actualizar-periodo.dto");
const crear_periodo_dto_1 = require("./dto/crear-periodo.dto");
const respuesta_periodo_dto_1 = require("./dto/respuesta-periodo.dto");
const periodos_servicio_1 = require("./periodos.servicio");
let PeriodosControlador = class PeriodosControlador {
    constructor(periodosServicio) {
        this.periodosServicio = periodosServicio;
    }
    crear(dto) {
        return this.periodosServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.periodosServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.periodosServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.periodosServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.periodosServicio.eliminar(id);
    }
};
exports.PeriodosControlador = PeriodosControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('PERIODO_ACADEMICO'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear periodo académico' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_periodo_dto_1.RespuestaPeriodoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_periodo_dto_1.CrearPeriodoDto]),
    __metadata("design:returntype", Promise)
], PeriodosControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar periodos paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_periodo_dto_1.RespuestaPaginadaPeriodoDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeriodosControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener periodo por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_periodo_dto_1.RespuestaPeriodoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PeriodosControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('PERIODO_ACADEMICO'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar periodo' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_periodo_dto_1.RespuestaPeriodoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_periodo_dto_1.ActualizarPeriodoDto]),
    __metadata("design:returntype", Promise)
], PeriodosControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('PERIODO_ACADEMICO'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar periodo' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PeriodosControlador.prototype, "eliminar", null);
exports.PeriodosControlador = PeriodosControlador = __decorate([
    (0, swagger_1.ApiTags)('periodos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('periodos'),
    __metadata("design:paramtypes", [periodos_servicio_1.PeriodosServicio])
], PeriodosControlador);
//# sourceMappingURL=periodos.controlador.js.map