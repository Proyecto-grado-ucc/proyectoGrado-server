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
exports.PreguntasControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const actualizar_pregunta_dto_1 = require("./dto/actualizar-pregunta.dto");
const crear_pregunta_dto_1 = require("./dto/crear-pregunta.dto");
const respuesta_pregunta_dto_1 = require("./dto/respuesta-pregunta.dto");
const preguntas_servicio_1 = require("./preguntas.servicio");
let PreguntasControlador = class PreguntasControlador {
    constructor(preguntasServicio) {
        this.preguntasServicio = preguntasServicio;
    }
    crear(dto) {
        return this.preguntasServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.preguntasServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.preguntasServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.preguntasServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.preguntasServicio.eliminar(id);
    }
};
exports.PreguntasControlador = PreguntasControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('PREGUNTA'),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_pregunta_dto_1.RespuestaPreguntaDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_pregunta_dto_1.CrearPreguntaDto]),
    __metadata("design:returntype", Promise)
], PreguntasControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar preguntas paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_pregunta_dto_1.RespuestaPaginadaPreguntaDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PreguntasControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_pregunta_dto_1.RespuestaPreguntaDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreguntasControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('PREGUNTA'),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_pregunta_dto_1.RespuestaPreguntaDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_pregunta_dto_1.ActualizarPreguntaDto]),
    __metadata("design:returntype", Promise)
], PreguntasControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('PREGUNTA'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreguntasControlador.prototype, "eliminar", null);
exports.PreguntasControlador = PreguntasControlador = __decorate([
    (0, swagger_1.ApiTags)('preguntas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('preguntas'),
    __metadata("design:paramtypes", [preguntas_servicio_1.PreguntasServicio])
], PreguntasControlador);
//# sourceMappingURL=preguntas.controlador.js.map