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
exports.Formulario = void 0;
const typeorm_1 = require("typeorm");
const periodo_academico_entidad_1 = require("../../compartido/entidades/periodo-academico.entidad");
let Formulario = class Formulario {
};
exports.Formulario = Formulario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Formulario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Formulario.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Formulario.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => periodo_academico_entidad_1.PeriodoAcademico, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'periodo_id' }),
    __metadata("design:type", periodo_academico_entidad_1.PeriodoAcademico)
], Formulario.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Formulario.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Dimension', 'formulario'),
    __metadata("design:type", Array)
], Formulario.prototype, "dimensiones", void 0);
exports.Formulario = Formulario = __decorate([
    (0, typeorm_1.Entity)('formulario')
], Formulario);
//# sourceMappingURL=formulario.entidad.js.map