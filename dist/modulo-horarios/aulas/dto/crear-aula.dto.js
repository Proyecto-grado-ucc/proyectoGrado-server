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
exports.CrearAulaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const aula_entidad_1 = require("../../entidades/aula.entidad");
class CrearAulaDto {
}
exports.CrearAulaDto = CrearAulaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A-101' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CrearAulaDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CrearAulaDto.prototype, "capacidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: aula_entidad_1.TipoAula, default: aula_entidad_1.TipoAula.Salon }),
    (0, class_validator_1.IsIn)(Object.values(aula_entidad_1.TipoAula)),
    __metadata("design:type", String)
], CrearAulaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CrearAulaDto.prototype, "activa", void 0);
//# sourceMappingURL=crear-aula.dto.js.map