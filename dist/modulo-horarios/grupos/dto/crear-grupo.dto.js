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
exports.CrearGrupoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const grupo_entidad_1 = require("../../entidades/grupo.entidad");
class CrearGrupoDto {
}
exports.CrearGrupoDto = CrearGrupoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'G-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CrearGrupoDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CrearGrupoDto.prototype, "cursoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CrearGrupoDto.prototype, "cupoMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: grupo_entidad_1.Jornada, example: grupo_entidad_1.Jornada.Manana }),
    (0, class_validator_1.IsIn)(Object.values(grupo_entidad_1.Jornada)),
    __metadata("design:type", String)
], CrearGrupoDto.prototype, "jornada", void 0);
//# sourceMappingURL=crear-grupo.dto.js.map