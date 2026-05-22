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
exports.Alerta = exports.NivelAlerta = exports.TipoAlerta = void 0;
const typeorm_1 = require("typeorm");
var TipoAlerta;
(function (TipoAlerta) {
    TipoAlerta["BAJO_RENDIMIENTO"] = "BAJO_RENDIMIENTO";
    TipoAlerta["MEJORA_NOTABLE"] = "MEJORA_NOTABLE";
    TipoAlerta["SIN_EVALUACIONES"] = "SIN_EVALUACIONES";
})(TipoAlerta || (exports.TipoAlerta = TipoAlerta = {}));
var NivelAlerta;
(function (NivelAlerta) {
    NivelAlerta["INFO"] = "INFO";
    NivelAlerta["ADVERTENCIA"] = "ADVERTENCIA";
    NivelAlerta["CRITICO"] = "CRITICO";
})(NivelAlerta || (exports.NivelAlerta = NivelAlerta = {}));
let Alerta = class Alerta {
};
exports.Alerta = Alerta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alerta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'docente_id' }),
    __metadata("design:type", Number)
], Alerta.prototype, "docenteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'periodo_id' }),
    __metadata("design:type", Number)
], Alerta.prototype, "periodoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoAlerta }),
    __metadata("design:type", String)
], Alerta.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: NivelAlerta }),
    __metadata("design:type", String)
], Alerta.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Alerta.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Alerta.prototype, "leida", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Alerta.prototype, "creadoEn", void 0);
exports.Alerta = Alerta = __decorate([
    (0, typeorm_1.Entity)('alerta')
], Alerta);
//# sourceMappingURL=alerta.entidad.js.map