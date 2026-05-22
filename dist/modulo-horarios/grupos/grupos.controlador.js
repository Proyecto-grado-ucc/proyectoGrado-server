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
exports.GruposControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const actualizar_grupo_dto_1 = require("./dto/actualizar-grupo.dto");
const crear_grupo_dto_1 = require("./dto/crear-grupo.dto");
const respuesta_grupo_dto_1 = require("./dto/respuesta-grupo.dto");
const grupos_servicio_1 = require("./grupos.servicio");
let GruposControlador = class GruposControlador {
    constructor(gruposServicio) {
        this.gruposServicio = gruposServicio;
    }
    crear(dto) {
        return this.gruposServicio.crear(dto);
    }
    listar(page = 1, size = 20) {
        return this.gruposServicio.listar(page, size);
    }
    buscarPorId(id) {
        return this.gruposServicio.buscarPorId(id);
    }
    actualizar(id, dto) {
        return this.gruposServicio.actualizar(id, dto);
    }
    eliminar(id) {
        return this.gruposServicio.eliminar(id);
    }
};
exports.GruposControlador = GruposControlador;
__decorate([
    (0, common_1.Post)(),
    (0, auditar_decorador_1.Auditar)('GRUPO'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear grupo' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_grupo_dto_1.RespuestaGrupoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_grupo_dto_1.CrearGrupoDto]),
    __metadata("design:returntype", Promise)
], GruposControlador.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar grupos paginado' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_grupo_dto_1.RespuestaPaginadaGrupoDto }),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('size', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GruposControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener grupo por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_grupo_dto_1.RespuestaGrupoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GruposControlador.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auditar_decorador_1.Auditar)('GRUPO'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar grupo' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_grupo_dto_1.RespuestaGrupoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_grupo_dto_1.ActualizarGrupoDto]),
    __metadata("design:returntype", Promise)
], GruposControlador.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auditar_decorador_1.Auditar)('GRUPO'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar grupo' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GruposControlador.prototype, "eliminar", null);
exports.GruposControlador = GruposControlador = __decorate([
    (0, swagger_1.ApiTags)('grupos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('grupos'),
    __metadata("design:paramtypes", [grupos_servicio_1.GruposServicio])
], GruposControlador);
//# sourceMappingURL=grupos.controlador.js.map