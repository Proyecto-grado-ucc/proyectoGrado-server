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
exports.RespuestaAlertaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const alerta_entidad_1 = require("../../entidades/alerta.entidad");
class RespuestaAlertaDto {
}
exports.RespuestaAlertaDto = RespuestaAlertaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAlertaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAlertaDto.prototype, "docenteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAlertaDto.prototype, "periodoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: alerta_entidad_1.TipoAlerta }),
    __metadata("design:type", String)
], RespuestaAlertaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: alerta_entidad_1.NivelAlerta }),
    __metadata("design:type", String)
], RespuestaAlertaDto.prototype, "nivel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaAlertaDto.prototype, "mensaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RespuestaAlertaDto.prototype, "leida", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RespuestaAlertaDto.prototype, "creadoEn", void 0);
//# sourceMappingURL=respuesta-alerta.dto.js.map