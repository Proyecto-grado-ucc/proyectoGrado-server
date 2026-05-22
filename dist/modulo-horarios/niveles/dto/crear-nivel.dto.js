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
exports.CrearNivelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const nivel_idioma_entidad_1 = require("../../entidades/nivel-idioma.entidad");
class CrearNivelDto {
}
exports.CrearNivelDto = CrearNivelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: nivel_idioma_entidad_1.CodigoNivel, example: nivel_idioma_entidad_1.CodigoNivel.A1 }),
    (0, class_validator_1.IsIn)(Object.values(nivel_idioma_entidad_1.CodigoNivel)),
    __metadata("design:type", String)
], CrearNivelDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Principiante' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CrearNivelDto.prototype, "nombre", void 0);
//# sourceMappingURL=crear-nivel.dto.js.map