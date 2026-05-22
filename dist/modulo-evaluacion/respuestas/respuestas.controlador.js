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
exports.RespuestasControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const actualizar_respuesta_dto_1 = require("./dto/actualizar-respuesta.dto");
const crear_respuesta_dto_1 = require("./dto/crear-respuesta.dto");
const respuesta_respuesta_dto_1 = require("./dto/respuesta-respuesta.dto");
const respuestas_servicio_1 = require("./respuestas.servicio");
let RespuestasControlador = class RespuestasControlador {
    constructor(respuestasServicio) {
        this.respuestasServicio = respuestasServicio;
    }
    crear(dto) {
        return this.respuestasServicio.crear(dto);
    }
    listarPorEvaluacion(evaluacionId, page = 1, size = 50) {
        return this.respuestasServicio.listarPorEvaluacion(evaluacionId, page, size);
    }
    buscarPorId(id) {
        return this.respuestasServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.respuestasServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.respuestasServicio.eliminar(id);
    }
};
exports.RespuestasControlador = RespuestasControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('RESPUESTA'),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_respuesta_dto_1.DetalleRespuestaDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_respuesta_dto_1.CrearRespuestaDto]),
    __metadata("design:returntype", Promise)
], RespuestasControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)('por-evaluacion/:evaluacionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar respuestas de una evaluación' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 50 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_respuesta_dto_1.RespuestaPaginadaRespuestaDto }),
    __param(0, (0, common_1.Param)('evaluacionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RespuestasControlador.prototype, "listarPorEvaluacion", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_respuesta_dto_1.DetalleRespuestaDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('RESPUESTA'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_respuesta_dto_1.DetalleRespuestaDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_respuesta_dto_1.ActualizarRespuestaDto]),
    __metadata("design:returntype", Promise)
], RespuestasControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('RESPUESTA'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RespuestasControlador.prototype, "eliminar", null);
exports.RespuestasControlador = RespuestasControlador = __decorate([
    (0, swagger_1.ApiTags)('respuestas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('respuestas'),
    __metadata("design:paramtypes", [respuestas_servicio_1.RespuestasServicio])
], RespuestasControlador);
//# sourceMappingURL=respuestas.controlador.js.map