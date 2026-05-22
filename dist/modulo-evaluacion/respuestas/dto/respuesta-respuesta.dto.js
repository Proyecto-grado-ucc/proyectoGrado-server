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
exports.RespuestaPaginadaRespuestaDto = exports.DetalleRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pregunta_entidad_1 = require("../../entidades/pregunta.entidad");
class DetalleRespuestaDto {
}
exports.DetalleRespuestaDto = DetalleRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DetalleRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DetalleRespuestaDto.prototype, "evaluacionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DetalleRespuestaDto.prototype, "preguntaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DetalleRespuestaDto.prototype, "preguntaTexto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: pregunta_entidad_1.TipoPregunta }),
    __metadata("design:type", String)
], DetalleRespuestaDto.prototype, "preguntaTipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], DetalleRespuestaDto.prototype, "valorNumerico", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], DetalleRespuestaDto.prototype, "valorTexto", void 0);
class RespuestaPaginadaRespuestaDto {
}
exports.RespuestaPaginadaRespuestaDto = RespuestaPaginadaRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DetalleRespuestaDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaRespuestaDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaRespuestaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaRespuestaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaRespuestaDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-respuesta.dto.js.map