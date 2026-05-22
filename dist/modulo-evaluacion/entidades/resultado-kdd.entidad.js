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
exports.ResultadoKdd = void 0;
const typeorm_1 = require("typeorm");
let ResultadoKdd = class ResultadoKdd {
};
exports.ResultadoKdd = ResultadoKdd;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResultadoKdd.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'periodo_id' }),
    __metadata("design:type", Number)
], ResultadoKdd.prototype, "periodoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'docente_id' }),
    __metadata("design:type", Number)
], ResultadoKdd.prototype, "docenteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'puntuacion_global', type: 'float' }),
    __metadata("design:type", Number)
], ResultadoKdd.prototype, "puntuacionGlobal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_evaluaciones', type: 'int' }),
    __metadata("design:type", Number)
], ResultadoKdd.prototype, "totalEvaluaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detalle_dimensiones', type: 'jsonb' }),
    __metadata("design:type", Object)
], ResultadoKdd.prototype, "detalleDimensiones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ResultadoKdd.prototype, "creadoEn", void 0);
exports.ResultadoKdd = ResultadoKdd = __decorate([
    (0, typeorm_1.Entity)('resultado_kdd')
], ResultadoKdd);
//# sourceMappingURL=resultado-kdd.entidad.js.map