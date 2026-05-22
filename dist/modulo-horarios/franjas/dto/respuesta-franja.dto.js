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
exports.RespuestaPaginadaFranjaDto = exports.RespuestaFranjaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const franja_horaria_entidad_1 = require("../../entidades/franja-horaria.entidad");
class RespuestaFranjaDto {
}
exports.RespuestaFranjaDto = RespuestaFranjaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaFranjaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: franja_horaria_entidad_1.DiaSemana }),
    __metadata("design:type", String)
], RespuestaFranjaDto.prototype, "diaSemana", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaFranjaDto.prototype, "horaInicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaFranjaDto.prototype, "horaFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaFranjaDto.prototype, "bloqueIdx", void 0);
class RespuestaPaginadaFranjaDto {
}
exports.RespuestaPaginadaFranjaDto = RespuestaPaginadaFranjaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaFranjaDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaFranjaDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFranjaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFranjaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFranjaDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-franja.dto.js.map