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
exports.Dimension = void 0;
const typeorm_1 = require("typeorm");
const formulario_entidad_1 = require("./formulario.entidad");
let Dimension = class Dimension {
};
exports.Dimension = Dimension;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Dimension.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Dimension.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Dimension.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1.0 }),
    __metadata("design:type", Number)
], Dimension.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formulario_entidad_1.Formulario, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'formulario_id' }),
    __metadata("design:type", formulario_entidad_1.Formulario)
], Dimension.prototype, "formulario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Pregunta', 'dimension'),
    __metadata("design:type", Array)
], Dimension.prototype, "preguntas", void 0);
exports.Dimension = Dimension = __decorate([
    (0, typeorm_1.Entity)('dimension')
], Dimension);
//# sourceMappingURL=dimension.entidad.js.map