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
exports.FranjaHoraria = exports.DiaSemana = void 0;
const typeorm_1 = require("typeorm");
var DiaSemana;
(function (DiaSemana) {
    DiaSemana["Lunes"] = "LUN";
    DiaSemana["Martes"] = "MAR";
    DiaSemana["Miercoles"] = "MIE";
    DiaSemana["Jueves"] = "JUE";
    DiaSemana["Viernes"] = "VIE";
    DiaSemana["Sabado"] = "SAB";
})(DiaSemana || (exports.DiaSemana = DiaSemana = {}));
let FranjaHoraria = class FranjaHoraria {
};
exports.FranjaHoraria = FranjaHoraria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FranjaHoraria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DiaSemana, name: 'dia_semana' }),
    __metadata("design:type", String)
], FranjaHoraria.prototype, "diaSemana", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', name: 'hora_inicio' }),
    __metadata("design:type", String)
], FranjaHoraria.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', name: 'hora_fin' }),
    __metadata("design:type", String)
], FranjaHoraria.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'bloque_idx' }),
    __metadata("design:type", Number)
], FranjaHoraria.prototype, "bloqueIdx", void 0);
exports.FranjaHoraria = FranjaHoraria = __decorate([
    (0, typeorm_1.Entity)('franja_horaria')
], FranjaHoraria);
//# sourceMappingURL=franja-horaria.entidad.js.map