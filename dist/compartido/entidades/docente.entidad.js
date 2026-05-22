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
exports.Docente = void 0;
const typeorm_1 = require("typeorm");
const usuario_entidad_1 = require("../../seguridad/entidades/usuario.entidad");
let Docente = class Docente {
};
exports.Docente = Docente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Docente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entidad_1.Usuario, { eager: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entidad_1.Usuario)
], Docente.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], Docente.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'carga_maxima_horas', default: 40 }),
    __metadata("design:type", Number)
], Docente.prototype, "cargaMaximaHoras", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Disponibilidad', 'docente'),
    __metadata("design:type", Array)
], Docente.prototype, "disponibilidades", void 0);
exports.Docente = Docente = __decorate([
    (0, typeorm_1.Entity)('docente')
], Docente);
//# sourceMappingURL=docente.entidad.js.map