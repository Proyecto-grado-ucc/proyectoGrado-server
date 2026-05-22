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
exports.RespuestaPaginadaPreguntaDto = exports.RespuestaPreguntaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pregunta_entidad_1 = require("../../entidades/pregunta.entidad");
class RespuestaPreguntaDto {
}
exports.RespuestaPreguntaDto = RespuestaPreguntaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPreguntaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaPreguntaDto.prototype, "texto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: pregunta_entidad_1.TipoPregunta }),
    __metadata("design:type", String)
], RespuestaPreguntaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPreguntaDto.prototype, "ordenIdx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPreguntaDto.prototype, "dimensionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaPreguntaDto.prototype, "dimensionNombre", void 0);
class RespuestaPaginadaPreguntaDto {
}
exports.RespuestaPaginadaPreguntaDto = RespuestaPaginadaPreguntaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaPreguntaDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaPreguntaDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaPreguntaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaPreguntaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaPreguntaDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-pregunta.dto.js.map