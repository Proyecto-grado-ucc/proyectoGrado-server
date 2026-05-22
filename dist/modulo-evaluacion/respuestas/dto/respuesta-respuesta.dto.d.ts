import { TipoPregunta } from '../../entidades/pregunta.entidad';
export declare class DetalleRespuestaDto {
    id: number;
    evaluacionId: number;
    preguntaId: number;
    preguntaTexto: string;
    preguntaTipo: TipoPregunta;
    valorNumerico: number | null;
    valorTexto: string | null;
}
export declare class RespuestaPaginadaRespuestaDto {
    items: DetalleRespuestaDto[];
    total: number;
    page: number;
    size: number;
}
