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
exports.KddControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guardia_1 = require("../../seguridad/auth/guardias/jwt.guardia");
const roles_guardia_1 = require("../../seguridad/auth/guardias/roles.guardia");
const auditar_decorador_1 = require("../../seguridad/decoradores/auditar.decorador");
const roles_decorador_1 = require("../../seguridad/decoradores/roles.decorador");
const rol_entidad_1 = require("../../seguridad/entidades/rol.entidad");
const ejecutar_kdd_dto_1 = require("./dto/ejecutar-kdd.dto");
const respuesta_kdd_dto_1 = require("./dto/respuesta-kdd.dto");
const kdd_pipeline_servicio_1 = require("./kdd-pipeline.servicio");
let KddControlador = class KddControlador {
    constructor(kddServicio) {
        this.kddServicio = kddServicio;
    }
    ejecutar(dto) {
        return this.kddServicio.ejecutar(dto.periodoId);
    }
    listarResultados(periodoId) {
        return this.kddServicio.listarResultados(periodoId);
    }
};
exports.KddControlador = KddControlador;
__decorate([
    (0, common_1.Post)('ejecutar'),
    (0, auditar_decorador_1.Auditar)('KDD'),
    (0, swagger_1.ApiOperation)({ summary: 'Ejecutar pipeline KDD para un período académico' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: respuesta_kdd_dto_1.RespuestaEjecucionKddDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ejecutar_kdd_dto_1.EjecutarKddDto]),
    __metadata("design:returntype", Promise)
], KddControlador.prototype, "ejecutar", null);
__decorate([
    (0, common_1.Get)('resultados'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar resultados KDD por período' }),
    (0, swagger_1.ApiQuery)({ name: 'periodoId', required: true, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [respuesta_kdd_dto_1.RespuestaResultadoKddDto] }),
    __param(0, (0, common_1.Query)('periodoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KddControlador.prototype, "listarResultados", null);
exports.KddControlador = KddControlador = __decorate([
    (0, swagger_1.ApiTags)('kdd'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia),
    (0, roles_decorador_1.Roles)(rol_entidad_1.RolNombre.Admin),
    (0, common_1.Controller)('kdd'),
    __metadata("design:paramtypes", [kdd_pipeline_servicio_1.KddPipelineServicio])
], KddControlador);
//# sourceMappingURL=kdd.controlador.js.map