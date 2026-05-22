import { ActualizarPreguntaDto } from './dto/actualizar-pregunta.dto';
import { CrearPreguntaDto } from './dto/crear-pregunta.dto';
import { RespuestaPaginadaPreguntaDto, RespuestaPreguntaDto } from './dto/respuesta-pregunta.dto';
import { PreguntasServicio } from './preguntas.servicio';
export declare class PreguntasControlador {
    private readonly preguntasServicio;
    constructor(preguntasServicio: PreguntasServicio);
    crear(dto: CrearPreguntaDto): Promise<RespuestaPreguntaDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaPreguntaDto>;
    buscarPorId(id: number): Promise<RespuestaPreguntaDto>;
    actualizar(id: number, dto: ActualizarPreguntaDto): Promise<RespuestaPreguntaDto>;
    eliminar(id: number): Promise<void>;
}
