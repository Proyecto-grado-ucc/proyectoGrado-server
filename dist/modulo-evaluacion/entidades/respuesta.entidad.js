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
exports.Respuesta = void 0;
const typeorm_1 = require("typeorm");
const pregunta_entidad_1 = require("./pregunta.entidad");
const evaluacion_entidad_1 = require("./evaluacion.entidad");
let Respuesta = class Respuesta {
};
exports.Respuesta = Respuesta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Respuesta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => evaluacion_entidad_1.Evaluacion, { eager: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'evaluacion_id' }),
    __metadata("design:type", evaluacion_entidad_1.Evaluacion)
], Respuesta.prototype, "evaluacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pregunta_entidad_1.Pregunta, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'pregunta_id' }),
    __metadata("design:type", pregunta_entidad_1.Pregunta)
], Respuesta.prototype, "pregunta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'valor_numerico', nullable: true }),
    __metadata("design:type", Object)
], Respuesta.prototype, "valorNumerico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'valor_texto', nullable: true }),
    __metadata("design:type", Object)
], Respuesta.prototype, "valorTexto", void 0);
exports.Respuesta = Respuesta = __decorate([
    (0, typeorm_1.Entity)('respuesta')
], Respuesta);
//# sourceMappingURL=respuesta.entidad.js.map