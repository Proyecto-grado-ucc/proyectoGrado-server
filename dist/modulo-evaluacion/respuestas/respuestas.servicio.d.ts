import { Repository } from 'typeorm';
import { Evaluacion } from '../entidades/evaluacion.entidad';
import { Pregunta } from '../entidades/pregunta.entidad';
import { Respuesta } from '../entidades/respuesta.entidad';
import { ActualizarRespuestaDto } from './dto/actualizar-respuesta.dto';
import { CrearRespuestaDto } from './dto/crear-respuesta.dto';
import { DetalleRespuestaDto, RespuestaPaginadaRespuestaDto } from './dto/respuesta-respuesta.dto';
export declare class RespuestasServicio {
    private readonly respuestaRepo;
    private readonly evaluacionRepo;
    private readonly preguntaRepo;
    constructor(respuestaRepo: Repository<Respuesta>, evaluacionRepo: Repository<Evaluacion>, preguntaRepo: Repository<Pregunta>);
    crear(dto: CrearRespuestaDto): Promise<DetalleRespuestaDto>;
    listarPorEvaluacion(evaluacionId: number, page: number, size: number): Promise<RespuestaPaginadaRespuestaDto>;
    buscarPorId(id: number): Promise<DetalleRespuestaDto>;
    actualizar(id: number, dto: ActualizarRespuestaDto): Promise<DetalleRespuestaDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
