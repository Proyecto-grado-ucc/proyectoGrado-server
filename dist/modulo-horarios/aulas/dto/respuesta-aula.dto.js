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
exports.RespuestaPaginadaAulaDto = exports.RespuestaAulaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const aula_entidad_1 = require("../../entidades/aula.entidad");
class RespuestaAulaDto {
}
exports.RespuestaAulaDto = RespuestaAulaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAulaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaAulaDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAulaDto.prototype, "capacidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: aula_entidad_1.TipoAula }),
    __metadata("design:type", String)
], RespuestaAulaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RespuestaAulaDto.prototype, "activa", void 0);
class RespuestaPaginadaAulaDto {
}
exports.RespuestaPaginadaAulaDto = RespuestaPaginadaAulaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaAulaDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaAulaDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAulaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAulaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAulaDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-aula.dto.js.map