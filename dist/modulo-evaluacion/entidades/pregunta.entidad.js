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
exports.Pregunta = exports.TipoPregunta = void 0;
const typeorm_1 = require("typeorm");
const dimension_entidad_1 = require("./dimension.entidad");
var TipoPregunta;
(function (TipoPregunta) {
    TipoPregunta["Abierta"] = "ABIERTA";
    TipoPregunta["Escala"] = "ESCALA";
    TipoPregunta["OpcionMultiple"] = "OPCION_MULTIPLE";
})(TipoPregunta || (exports.TipoPregunta = TipoPregunta = {}));
let Pregunta = class Pregunta {
};
exports.Pregunta = Pregunta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pregunta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Pregunta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoPregunta, default: TipoPregunta.Escala }),
    __metadata("design:type", String)
], Pregunta.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'orden_idx', default: 0 }),
    __metadata("design:type", Number)
], Pregunta.prototype, "ordenIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dimension_entidad_1.Dimension, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'dimension_id' }),
    __metadata("design:type", dimension_entidad_1.Dimension)
], Pregunta.prototype, "dimension", void 0);
exports.Pregunta = Pregunta = __decorate([
    (0, typeorm_1.Entity)('pregunta')
], Pregunta);
//# sourceMappingURL=pregunta.entidad.js.map