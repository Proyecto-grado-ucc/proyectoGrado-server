import { TipoPregunta } from '../../entidades/pregunta.entidad';
export declare class RespuestaPreguntaDto {
    id: number;
    texto: string;
    tipo: TipoPregunta;
    ordenIdx: number;
    dimensionId: number;
    dimensionNombre: string;
}
export declare class RespuestaPaginadaPreguntaDto {
    items: RespuestaPreguntaDto[];
    total: number;
    page: number;
    size: number;
}
