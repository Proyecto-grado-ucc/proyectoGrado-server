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
exports.Evaluacion = exports.EstadoEvaluacion = void 0;
const typeorm_1 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const formulario_entidad_1 = require("./formulario.entidad");
var EstadoEvaluacion;
(function (EstadoEvaluacion) {
    EstadoEvaluacion["Pendiente"] = "PENDIENTE";
    EstadoEvaluacion["EnProgreso"] = "EN_PROGRESO";
    EstadoEvaluacion["Completada"] = "COMPLETADA";
})(EstadoEvaluacion || (exports.EstadoEvaluacion = EstadoEvaluacion = {}));
let Evaluacion = class Evaluacion {
};
exports.Evaluacion = Evaluacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Evaluacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formulario_entidad_1.Formulario, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'formulario_id' }),
    __metadata("design:type", formulario_entidad_1.Formulario)
], Evaluacion.prototype, "formulario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => docente_entidad_1.Docente, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'docente_evaluado_id' }),
    __metadata("design:type", docente_entidad_1.Docente)
], Evaluacion.prototype, "docenteEvaluado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'evaluador_id', nullable: true }),
    __metadata("design:type", Object)
], Evaluacion.prototype, "evaluadorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoEvaluacion, default: EstadoEvaluacion.Pendiente }),
    __metadata("design:type", String)
], Evaluacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Evaluacion.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Respuesta', 'evaluacion'),
    __metadata("design:type", Array)
], Evaluacion.prototype, "respuestas", void 0);
exports.Evaluacion = Evaluacion = __decorate([
    (0, typeorm_1.Entity)('evaluacion')
], Evaluacion);
//# sourceMappingURL=evaluacion.entidad.js.map