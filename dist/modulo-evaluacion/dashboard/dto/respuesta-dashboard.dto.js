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
exports.RespuestaDashboardDto = exports.DistribucionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DistribucionDto {
}
exports.DistribucionDto = DistribucionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DistribucionDto.prototype, "rango", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DistribucionDto.prototype, "cantidad", void 0);
class RespuestaDashboardDto {
}
exports.RespuestaDashboardDto = RespuestaDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDashboardDto.prototype, "totalDocentes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDashboardDto.prototype, "totalEvaluaciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDashboardDto.prototype, "promedioGlobal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDashboardDto.prototype, "alertasCriticas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RespuestaDashboardDto.prototype, "alertasAdvertencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DistribucionDto] }),
    __metadata("design:type", Array)
], RespuestaDashboardDto.prototype, "distribucionPuntuaciones", void 0);
//# sourceMappingURL=respuesta-dashboard.dto.js.map