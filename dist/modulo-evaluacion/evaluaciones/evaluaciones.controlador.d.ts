import { EvaluacionesServicio } from './evaluaciones.servicio';
import { ActualizarEvaluacionDto } from './dto/actualizar-evaluacion.dto';
import { CrearEvaluacionDto } from './dto/crear-evaluacion.dto';
import { RespuestaEvaluacionDto, RespuestaPaginadaEvaluacionDto } from './dto/respuesta-evaluacion.dto';
export declare class EvaluacionesControlador {
    private readonly evaluacionesServicio;
    constructor(evaluacionesServicio: EvaluacionesServicio);
    crear(dto: CrearEvaluacionDto): Promise<RespuestaEvaluacionDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaEvaluacionDto>;
    buscarPorId(id: number): Promise<RespuestaEvaluacionDto>;
    actualizar(id: number, dto: ActualizarEvaluacionDto): Promise<RespuestaEvaluacionDto>;
    eliminar(id: number): Promise<void>;
}
