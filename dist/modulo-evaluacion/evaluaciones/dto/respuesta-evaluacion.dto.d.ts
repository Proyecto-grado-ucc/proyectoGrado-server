import { EstadoEvaluacion } from '../../entidades/evaluacion.entidad';
export declare class RespuestaEvaluacionDto {
    id: number;
    formularioId: number;
    formularioTitulo: string;
    docenteEvaluadoId: number;
    docenteEvaluadoNombre: string;
    evaluadorId: number | null;
    estado: EstadoEvaluacion;
    creadoEn: Date;
}
export declare class RespuestaPaginadaEvaluacionDto {
    items: RespuestaEvaluacionDto[];
    total: number;
    page: number;
    size: number;
}
