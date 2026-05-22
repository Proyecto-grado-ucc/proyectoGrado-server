import { Docente } from '../../compartido/entidades/docente.entidad';
import { Formulario } from './formulario.entidad';
export declare enum EstadoEvaluacion {
    Pendiente = "PENDIENTE",
    EnProgreso = "EN_PROGRESO",
    Completada = "COMPLETADA"
}
export declare class Evaluacion {
    id: number;
    formulario: Formulario;
    docenteEvaluado: Docente;
    evaluadorId: number | null;
    estado: EstadoEvaluacion;
    creadoEn: Date;
    respuestas: unknown[];
}
