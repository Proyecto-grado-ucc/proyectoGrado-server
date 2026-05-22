import { TipoPregunta } from '../../entidades/pregunta.entidad';
export declare class CrearPreguntaDto {
    texto: string;
    tipo: TipoPregunta;
    ordenIdx?: number;
    dimensionId: number;
}
