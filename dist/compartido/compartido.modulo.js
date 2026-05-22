"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompartidoModulo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entidad_1 = require("../seguridad/entidades/usuario.entidad");
const seguridad_modulo_1 = require("../seguridad/seguridad.modulo");
const docentes_controlador_1 = require("./docentes/docentes.controlador");
const docentes_servicio_1 = require("./docentes/docentes.servicio");
const docente_entidad_1 = require("./entidades/docente.entidad");
const estudiante_entidad_1 = require("./entidades/estudiante.entidad");
const periodo_academico_entidad_1 = require("./entidades/periodo-academico.entidad");
const estudiantes_controlador_1 = require("./estudiantes/estudiantes.controlador");
const estudiantes_servicio_1 = require("./estudiantes/estudiantes.servicio");
const periodos_controlador_1 = require("./periodos/periodos.controlador");
const periodos_servicio_1 = require("./periodos/periodos.servicio");
let CompartidoModulo = class CompartidoModulo {
};
exports.CompartidoModulo = CompartidoModulo;
exports.CompartidoModulo = CompartidoModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([docente_entidad_1.Docente, estudiante_entidad_1.Estudiante, periodo_academico_entidad_1.PeriodoAcademico, usuario_entidad_1.Usuario]),
            seguridad_modulo_1.SeguridadModulo,
        ],
        providers: [periodos_servicio_1.PeriodosServicio, docentes_servicio_1.DocentesServicio, estudiantes_servicio_1.EstudiantesServicio],
        controllers: [periodos_controlador_1.PeriodosControlador, docentes_controlador_1.DocentesControlador, estudiantes_controlador_1.EstudiantesControlador],
        exports: [docentes_servicio_1.DocentesServicio, estudiantes_servicio_1.EstudiantesServicio],
    })
], CompartidoModulo);
//# sourceMappingURL=compartido.modulo.js.map