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
exports.CursosControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const cursos_servicio_1 = require("./cursos.servicio");
const actualizar_curso_dto_1 = require("./dto/actualizar-curso.dto");
const crear_curso_dto_1 = require("./dto/crear-curso.dto");
const respuesta_curso_dto_1 = require("./dto/respuesta-curso.dto");
let CursosControlador = class CursosControlador {
    constructor(cursosServicio) {
        this.cursosServicio = cursosServicio;
    }
    crear(dto) {
        return this.cursosServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.cursosServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.cursosServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.cursosServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.cursosServicio.eliminar(id);
    }
};
exports.CursosControlador = CursosControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('CURSO'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear curso' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_curso_dto_1.RespuestaCursoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_curso_dto_1.CrearCursoDto]),
    __metadata("design:returntype", Promise)
], CursosControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar cursos paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_curso_dto_1.RespuestaPaginadaCursoDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CursosControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener curso por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_curso_dto_1.RespuestaCursoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CursosControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('CURSO'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar curso' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_curso_dto_1.RespuestaCursoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_curso_dto_1.ActualizarCursoDto]),
    __metadata("design:returntype", Promise)
], CursosControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('CURSO'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar curso' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CursosControlador.prototype, "eliminar", null);
exports.CursosControlador = CursosControlador = __decorate([
    (0, swagger_1.ApiTags)('cursos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('cursos'),
    __metadata("design:paramtypes", [cursos_servicio_1.CursosServicio])
], CursosControlador);
//# sourceMappingURL=cursos.controlador.js.map