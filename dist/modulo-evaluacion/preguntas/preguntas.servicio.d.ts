import { Repository } from 'typeorm';
import { Dimension } from '../entidades/dimension.entidad';
import { Pregunta } from '../entidades/pregunta.entidad';
import { ActualizarPreguntaDto } from './dto/actualizar-pregunta.dto';
import { CrearPreguntaDto } from './dto/crear-pregunta.dto';
import { RespuestaPaginadaPreguntaDto, RespuestaPreguntaDto } from './dto/respuesta-pregunta.dto';
export declare class PreguntasServicio {
    private readonly preguntaRepo;
    private readonly dimensionRepo;
    constructor(preguntaRepo: Repository<Pregunta>, dimensionRepo: Repository<Dimension>);
    crear(dto: CrearPreguntaDto): Promise<RespuestaPreguntaDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaPreguntaDto>;
    buscarPorId(id: number): Promise<RespuestaPreguntaDto>;
    actualizar(id: number, dto: ActualizarPreguntaDto): Promise<RespuestaPreguntaDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
