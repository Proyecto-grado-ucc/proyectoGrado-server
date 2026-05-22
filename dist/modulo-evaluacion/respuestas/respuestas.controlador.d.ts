import { ActualizarRespuestaDto } from './dto/actualizar-respuesta.dto';
import { CrearRespuestaDto } from './dto/crear-respuesta.dto';
import { DetalleRespuestaDto, RespuestaPaginadaRespuestaDto } from './dto/respuesta-respuesta.dto';
import { RespuestasServicio } from './respuestas.servicio';
export declare class RespuestasControlador {
    private readonly respuestasServicio;
    constructor(respuestasServicio: RespuestasServicio);
    crear(dto: CrearRespuestaDto): Promise<DetalleRespuestaDto>;
    listarPorEvaluacion(evaluacionId: number, page?: number, size?: number): Promise<RespuestaPaginadaRespuestaDto>;
    buscarPorId(id: number): Promise<DetalleRespuestaDto>;
    actualizar(id: number, dto: ActualizarRespuestaDto): Promise<DetalleRespuestaDto>;
    eliminar(id: number): Promise<void>;
}
