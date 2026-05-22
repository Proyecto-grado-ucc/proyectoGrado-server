"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuloEvaluacionModulo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const docente_entidad_1 = require("../compartido/entidades/docente.entidad");
const periodo_academico_entidad_1 = require("../compartido/entidades/periodo-academico.entidad");
const seguridad_modulo_1 = require("../seguridad/seguridad.modulo");
const alertas_controlador_1 = require("./alertas/alertas.controlador");
const alertas_servicio_1 = require("./alertas/alertas.servicio");
const dashboard_controlador_1 = require("./dashboard/dashboard.controlador");
const dashboard_servicio_1 = require("./dashboard/dashboard.servicio");
const dimensiones_controlador_1 = require("./dimensiones/dimensiones.controlador");
const dimensiones_servicio_1 = require("./dimensiones/dimensiones.servicio");
const alerta_entidad_1 = require("./entidades/alerta.entidad");
const dimension_entidad_1 = require("./entidades/dimension.entidad");
const evaluacion_entidad_1 = require("./entidades/evaluacion.entidad");
const formulario_entidad_1 = require("./entidades/formulario.entidad");
const pregunta_entidad_1 = require("./entidades/pregunta.entidad");
const resultado_kdd_entidad_1 = require("./entidades/resultado-kdd.entidad");
const respuesta_entidad_1 = require("./entidades/respuesta.entidad");
const evaluaciones_controlador_1 = require("./evaluaciones/evaluaciones.controlador");
const evaluaciones_servicio_1 = require("./evaluaciones/evaluaciones.servicio");
const formularios_controlador_1 = require("./formularios/formularios.controlador");
const formularios_servicio_1 = require("./formularios/formularios.servicio");
const kdd_controlador_1 = require("./kdd/kdd.controlador");
const kdd_pipeline_servicio_1 = require("./kdd/kdd-pipeline.servicio");
const preguntas_controlador_1 = require("./preguntas/preguntas.controlador");
const preguntas_servicio_1 = require("./preguntas/preguntas.servicio");
const respuestas_controlador_1 = require("./respuestas/respuestas.controlador");
const respuestas_servicio_1 = require("./respuestas/respuestas.servicio");
let ModuloEvaluacionModulo = class ModuloEvaluacionModulo {
};
exports.ModuloEvaluacionModulo = ModuloEvaluacionModulo;
exports.ModuloEvaluacionModulo = ModuloEvaluacionModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                formulario_entidad_1.Formulario, dimension_entidad_1.Dimension, pregunta_entidad_1.Pregunta, evaluacion_entidad_1.Evaluacion, respuesta_entidad_1.Respuesta,
                resultado_kdd_entidad_1.ResultadoKdd, alerta_entidad_1.Alerta,
                periodo_academico_entidad_1.PeriodoAcademico, docente_entidad_1.Docente,
            ]),
            seguridad_modulo_1.SeguridadModulo,
        ],
        providers: [
            formularios_servicio_1.FormulariosServicio, dimensiones_servicio_1.DimensionesServicio, preguntas_servicio_1.PreguntasServicio,
            evaluaciones_servicio_1.EvaluacionesServicio, respuestas_servicio_1.RespuestasServicio,
            kdd_pipeline_servicio_1.KddPipelineServicio, alertas_servicio_1.AlertasServicio, dashboard_servicio_1.DashboardServicio,
        ],
        controllers: [
            formularios_controlador_1.FormulariosControlador, dimensiones_controlador_1.DimensionesControlador, preguntas_controlador_1.PreguntasControlador,
            evaluaciones_controlador_1.EvaluacionesControlador, respuestas_controlador_1.RespuestasControlador,
            kdd_controlador_1.KddControlador, alertas_controlador_1.AlertasControlador, dashboard_controlador_1.DashboardControlador,
        ],
        exports: [evaluaciones_servicio_1.EvaluacionesServicio, respuestas_servicio_1.RespuestasServicio, kdd_pipeline_servicio_1.KddPipelineServicio, alertas_servicio_1.AlertasServicio],
    })
], ModuloEvaluacionModulo);
//# sourceMappingURL=modulo-evaluacion.modulo.js.map