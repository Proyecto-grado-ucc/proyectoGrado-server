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
exports.RespuestaPaginadaEstudianteDto = exports.RespuestaEstudianteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RespuestaEstudianteDto {
}
exports.RespuestaEstudianteDto = RespuestaEstudianteDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaEstudianteDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaEstudianteDto.prototype, "usuarioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaEstudianteDto.prototype, "usuarioNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaEstudianteDto.prototype, "usuarioEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], RespuestaEstudianteDto.prototype, "grupoId", void 0);
class RespuestaPaginadaEstudianteDto {
}
exports.RespuestaPaginadaEstudianteDto = RespuestaPaginadaEstudianteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaEstudianteDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaEstudianteDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEstudianteDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEstudianteDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaEstudianteDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-estudiante.dto.js.map