import { Pregunta } from './pregunta.entidad';
import { Evaluacion } from './evaluacion.entidad';
export declare class Respuesta {
    id: number;
    evaluacion: Evaluacion;
    pregunta: Pregunta;
    valorNumerico: number | null;
    valorTexto: string | null;
}
