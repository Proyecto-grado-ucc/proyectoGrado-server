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
exports.Grupo = exports.Jornada = void 0;
const typeorm_1 = require("typeorm");
const curso_entidad_1 = require("./curso.entidad");
var Jornada;
(function (Jornada) {
    Jornada["Manana"] = "MANANA";
    Jornada["Tarde"] = "TARDE";
    Jornada["Noche"] = "NOCHE";
})(Jornada || (exports.Jornada = Jornada = {}));
let Grupo = class Grupo {
};
exports.Grupo = Grupo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Grupo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Grupo.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curso_entidad_1.Curso, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'curso_id' }),
    __metadata("design:type", curso_entidad_1.Curso)
], Grupo.prototype, "curso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'cupo_max' }),
    __metadata("design:type", Number)
], Grupo.prototype, "cupoMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Jornada }),
    __metadata("design:type", String)
], Grupo.prototype, "jornada", void 0);
exports.Grupo = Grupo = __decorate([
    (0, typeorm_1.Entity)('grupo')
], Grupo);
//# sourceMappingURL=grupo.entidad.js.map