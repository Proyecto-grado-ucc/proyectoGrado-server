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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaPaginadaGrupoDto = exports.RespuestaGrupoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const grupo_entidad_1 = require("../../entidades/grupo.entidad");
class RespuestaGrupoDto {
}
exports.RespuestaGrupoDto = RespuestaGrupoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaGrupoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaGrupoDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaGrupoDto.prototype, "cursoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaGrupoDto.prototype, "cursoNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaGrupoDto.prototype, "cupoMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: grupo_entidad_1.Jornada }),
    __metadata("design:type", String)
], RespuestaGrupoDto.prototype, "jornada", void 0);
class RespuestaPaginadaGrupoDto {
}
exports.RespuestaPaginadaGrupoDto = RespuestaPaginadaGrupoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaGrupoDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaGrupoDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaGrupoDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaGrupoDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaGrupoDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-grupo.dto.js.map