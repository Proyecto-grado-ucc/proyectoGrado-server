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
exports.Horario = void 0;
const typeorm_1 = require("typeorm");
const periodo_academico_entidad_1 = require("../../compartido/entidades/periodo-academico.entidad");
let Horario = class Horario {
};
exports.Horario = Horario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Horario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => periodo_academico_entidad_1.PeriodoAcademico, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'periodo_id' }),
    __metadata("design:type", periodo_academico_entidad_1.PeriodoAcademico)
], Horario.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], Horario.prototype, "asignaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Horario.prototype, "fitness", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Horario.prototype, "generaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'tiempo_ms' }),
    __metadata("design:type", Number)
], Horario.prototype, "tiempoMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Horario.prototype, "metadatos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Horario.prototype, "creadoEn", void 0);
exports.Horario = Horario = __decorate([
    (0, typeorm_1.Entity)('horario')
], Horario);
//# sourceMappingURL=horario.entidad.js.map