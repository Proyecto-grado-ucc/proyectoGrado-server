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
exports.RespuestaPaginadaAuditLogDto = exports.RespuestaAuditLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RespuestaAuditLogDto {
}
exports.RespuestaAuditLogDto = RespuestaAuditLogDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaAuditLogDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], RespuestaAuditLogDto.prototype, "usuarioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaAuditLogDto.prototype, "accion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RespuestaAuditLogDto.prototype, "entidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], RespuestaAuditLogDto.prototype, "entidadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RespuestaAuditLogDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], RespuestaAuditLogDto.prototype, "datosPrevios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], RespuestaAuditLogDto.prototype, "datosNuevos", void 0);
class RespuestaPaginadaAuditLogDto {
}
exports.RespuestaPaginadaAuditLogDto = RespuestaPaginadaAuditLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RespuestaAuditLogDto] }),
    __metadata("design:type", Array)
], RespuestaPaginadaAuditLogDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAuditLogDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAuditLogDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaPaginadaAuditLogDto.prototype, "size", void 0);
//# sourceMappingURL=respuesta-audit-log.dto.js.map