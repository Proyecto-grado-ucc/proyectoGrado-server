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
exports.CrearFranjaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const franja_horaria_entidad_1 = require("../../entidades/franja-horaria.entidad");
class CrearFranjaDto {
}
exports.CrearFranjaDto = CrearFranjaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: franja_horaria_entidad_1.DiaSemana, example: franja_horaria_entidad_1.DiaSemana.Lunes }),
    (0, class_validator_1.IsIn)(Object.values(franja_horaria_entidad_1.DiaSemana)),
    __metadata("design:type", String)
], CrearFranjaDto.prototype, "diaSemana", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08:00:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'horaInicio debe tener formato HH:MM o HH:MM:SS' }),
    __metadata("design:type", String)
], CrearFranjaDto.prototype, "horaInicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'horaFin debe tener formato HH:MM o HH:MM:SS' }),
    __metadata("design:type", String)
], CrearFranjaDto.prototype, "horaFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CrearFranjaDto.prototype, "bloqueIdx", void 0);
//# sourceMappingURL=crear-franja.dto.js.map