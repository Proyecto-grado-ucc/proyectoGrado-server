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
exports.RespuestaPaginadaFormularioDto = exports.RespuestaFormularioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RespuestaFormularioDto {
}
exports.RespuestaFormularioDto = RespuestaFormularioDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaFormularioDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaFormularioDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], RespuestaFormularioDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaFormularioDto.prototype, "periodoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaFormularioDto.prototype, "periodoNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RespuestaFormularioDto.prototype, "activo", void 0);
class RespuestaPaginadaFormularioDto {
}
exports.RespuestaPaginadaFormularioDto = RespuestaPaginadaFormularioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaFormularioDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaFormularioDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFormularioDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFormularioDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaFormularioDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-formulario.dto.js.map