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
exports.EvaluacionesControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const evaluaciones_servicio_1 = require("./evaluaciones.servicio");
const actualizar_evaluacion_dto_1 = require("./dto/actualizar-evaluacion.dto");
const crear_evaluacion_dto_1 = require("./dto/crear-evaluacion.dto");
const respuesta_evaluacion_dto_1 = require("./dto/respuesta-evaluacion.dto");
let EvaluacionesControlador = class EvaluacionesControlador {
    constructor(evaluacionesServicio) {
        this.evaluacionesServicio = evaluacionesServicio;
    }
    crear(dto) {
        return this.evaluacionesServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.evaluacionesServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.evaluacionesServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.evaluacionesServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.evaluacionesServicio.eliminar(id);
    }
};
exports.EvaluacionesControlador = EvaluacionesControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('EVALUACION'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear evaluación docente' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_evaluacion_dto_1.RespuestaEvaluacionDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_evaluacion_dto_1.CrearEvaluacionDto]),
    __metadata("design:returntype", Promise)
], EvaluacionesControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar evaluaciones paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_evaluacion_dto_1.RespuestaPaginadaEvaluacionDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EvaluacionesControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_evaluacion_dto_1.RespuestaEvaluacionDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvaluacionesControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('EVALUACION'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_evaluacion_dto_1.RespuestaEvaluacionDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_evaluacion_dto_1.ActualizarEvaluacionDto]),
    __metadata("design:returntype", Promise)
], EvaluacionesControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('EVALUACION'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvaluacionesControlador.prototype, "eliminar", null);
exports.EvaluacionesControlador = EvaluacionesControlador = __decorate([
    (0, swagger_1.ApiTags)('evaluaciones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('evaluaciones'),
    __metadata("design:paramtypes", [evaluaciones_servicio_1.EvaluacionesServicio])
], EvaluacionesControlador);
//# sourceMappingURL=evaluaciones.controlador.js.map