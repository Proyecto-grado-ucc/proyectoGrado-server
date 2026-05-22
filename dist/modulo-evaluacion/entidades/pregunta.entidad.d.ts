import { Dimension } from './dimension.entidad';
export declare enum TipoPregunta {
    Abierta = "ABIERTA",
    Escala = "ESCALA",
    OpcionMultiple = "OPCION_MULTIPLE"
}
export declare class Pregunta {
    id: number;
    texto: string;
    tipo: TipoPregunta;
    ordenIdx: number;
    dimension: Dimension;
}
