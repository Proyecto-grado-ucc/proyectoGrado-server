import { Repository } from 'typeorm';
import { Aula } from '../entidades/aula.entidad';
import { ActualizarAulaDto } from './dto/actualizar-aula.dto';
import { CrearAulaDto } from './dto/crear-aula.dto';
import { RespuestaAulaDto, RespuestaPaginadaAulaDto } from './dto/respuesta-aula.dto';
export declare class AulasServicio {
    private readonly aulaRepo;
    constructor(aulaRepo: Repository<Aula>);
    crear(dto: CrearAulaDto): Promise<RespuestaAulaDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaAulaDto>;
    buscarPorId(id: number): Promise<RespuestaAulaDto>;
    actualizar(id: number, dto: ActualizarAulaDto): Promise<RespuestaAulaDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
