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
exports.RespuestaPaginadaDisponibilidadDto = exports.RespuestaDisponibilidadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RespuestaDisponibilidadDto {
}
exports.RespuestaDisponibilidadDto = RespuestaDisponibilidadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDisponibilidadDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDisponibilidadDto.prototype, "docenteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaDisponibilidadDto.prototype, "docenteNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDisponibilidadDto.prototype, "franjaHorariaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaDisponibilidadDto.prototype, "diaSemana", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaDisponibilidadDto.prototype, "horaInicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaDisponibilidadDto.prototype, "horaFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RespuestaDisponibilidadDto.prototype, "disponible", void 0);
class RespuestaPaginadaDisponibilidadDto {
}
exports.RespuestaPaginadaDisponibilidadDto = RespuestaPaginadaDisponibilidadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaDisponibilidadDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaDisponibilidadDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaDisponibilidadDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaDisponibilidadDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaDisponibilidadDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-disponibilidad.dto.js.map