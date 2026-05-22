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
exports.RespuestaPaginadaEvaluacionDto = exports.RespuestaEvaluacionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluacion_entidad_1 = require("../../entidades/evaluacion.entidad");
class RespuestaEvaluacionDto {
}
exports.RespuestaEvaluacionDto = RespuestaEvaluacionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaEvaluacionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaEvaluacionDto.prototype, "formularioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaEvaluacionDto.prototype, "formularioTitulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaEvaluacionDto.prototype, "docenteEvaluadoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaEvaluacionDto.prototype, "docenteEvaluadoNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], RespuestaEvaluacionDto.prototype, "evaluadorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: evaluacion_entidad_1.EstadoEvaluacion }),
    __metadata("design:type", String)
], RespuestaEvaluacionDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RespuestaEvaluacionDto.prototype, "creadoEn", void 0);
class RespuestaPaginadaEvaluacionDto {
}
exports.RespuestaPaginadaEvaluacionDto = RespuestaPaginadaEvaluacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaEvaluacionDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaEvaluacionDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEvaluacionDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEvaluacionDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEvaluacionDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-evaluacion.dto.js.map