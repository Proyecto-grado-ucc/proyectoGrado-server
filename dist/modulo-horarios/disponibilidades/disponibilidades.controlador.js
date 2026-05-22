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
exports.DisponibilidadesControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const disponibilidades_servicio_1 = require("./disponibilidades.servicio");
const actualizar_disponibilidad_dto_1 = require("./dto/actualizar-disponibilidad.dto");
const crear_disponibilidad_dto_1 = require("./dto/crear-disponibilidad.dto");
const respuesta_disponibilidad_dto_1 = require("./dto/respuesta-disponibilidad.dto");
let DisponibilidadesControlador = class DisponibilidadesControlador {
    constructor(disponibilidadesServicio) {
        this.disponibilidadesServicio = disponibilidadesServicio;
    }
    crear(dto) {
        return this.disponibilidadesServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.disponibilidadesServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.disponibilidadesServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.disponibilidadesServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.disponibilidadesServicio.eliminar(id);
    }
};
exports.DisponibilidadesControlador = DisponibilidadesControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('DISPONIBILIDAD'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar disponibilidad de docente' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_disponibilidad_dto_1.RespuestaDisponibilidadDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_disponibilidad_dto_1.CrearDisponibilidadDto]),
    __metadata("design:returntype", Promise)
], DisponibilidadesControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar disponibilidades paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_disponibilidad_dto_1.RespuestaPaginadaDisponibilidadDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DisponibilidadesControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener disponibilidad por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_disponibilidad_dto_1.RespuestaDisponibilidadDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DisponibilidadesControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('DISPONIBILIDAD'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar disponibilidad' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_disponibilidad_dto_1.RespuestaDisponibilidadDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_disponibilidad_dto_1.ActualizarDisponibilidadDto]),
    __metadata("design:returntype", Promise)
], DisponibilidadesControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('DISPONIBILIDAD'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar disponibilidad' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DisponibilidadesControlador.prototype, "eliminar", null);
exports.DisponibilidadesControlador = DisponibilidadesControlador = __decorate([
    (0, swagger_1.ApiTags)('disponibilidades'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('disponibilidades'),
    __metadata("design:paramtypes", [disponibilidades_servicio_1.DisponibilidadesServicio])
], DisponibilidadesControlador);
//# sourceMappingURL=disponibilidades.controlador.js.map