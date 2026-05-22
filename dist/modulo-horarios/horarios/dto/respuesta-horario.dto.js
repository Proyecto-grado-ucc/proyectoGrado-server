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
exports.RespuestaPaginadaHorarioDto = exports.RespuestaHorarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AsignacionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AsignacionDto.prototype, "grupoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AsignacionDto.prototype, "docenteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AsignacionDto.prototype, "aulaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AsignacionDto.prototype, "franjaId", void 0);
class RespuestaHorarioDto {
}
exports.RespuestaHorarioDto = RespuestaHorarioDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaHorarioDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaHorarioDto.prototype, "periodoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaHorarioDto.prototype, "periodoNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AsignacionDto] }),
    __metadata("design:type", Array)
], RespuestaHorarioDto.prototype, "asignaciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaHorarioDto.prototype, "fitness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaHorarioDto.prototype, "generaciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaHorarioDto.prototype, "tiempoMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RespuestaHorarioDto.prototype, "creadoEn", void 0);
class RespuestaPaginadaHorarioDto {
}
exports.RespuestaPaginadaHorarioDto = RespuestaPaginadaHorarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaHorarioDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaHorarioDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaHorarioDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaHorarioDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaHorarioDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-horario.dto.js.map