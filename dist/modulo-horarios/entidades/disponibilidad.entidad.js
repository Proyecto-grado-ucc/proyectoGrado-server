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
exports.Disponibilidad = void 0;
const typeorm_1 = require("typeorm");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const franja_horaria_entidad_1 = require("./franja-horaria.entidad");
let Disponibilidad = class Disponibilidad {
};
exports.Disponibilidad = Disponibilidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Disponibilidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => docente_entidad_1.Docente, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'docente_id' }),
    __metadata("design:type", docente_entidad_1.Docente)
], Disponibilidad.prototype, "docente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => franja_horaria_entidad_1.FranjaHoraria, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'franja_horaria_id' }),
    __metadata("design:type", franja_horaria_entidad_1.FranjaHoraria)
], Disponibilidad.prototype, "franjaHoraria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Disponibilidad.prototype, "disponible", void 0);
exports.Disponibilidad = Disponibilidad = __decorate([
    (0, typeorm_1.Entity)('disponibilidad'),
    (0, typeorm_1.Unique)(['docente', 'franjaHoraria'])
], Disponibilidad);
//# sourceMappingURL=disponibilidad.entidad.js.map