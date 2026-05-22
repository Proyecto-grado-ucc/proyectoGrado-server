import { Repository } from 'typeorm';
import { FranjaHoraria } from '../entidades/franja-horaria.entidad';
import { ActualizarFranjaDto } from './dto/actualizar-franja.dto';
import { CrearFranjaDto } from './dto/crear-franja.dto';
import { RespuestaFranjaDto, RespuestaPaginadaFranjaDto } from './dto/respuesta-franja.dto';
export declare class FranjasServicio {
    private readonly franjaRepo;
    constructor(franjaRepo: Repository<FranjaHoraria>);
    crear(dto: CrearFranjaDto): Promise<RespuestaFranjaDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaFranjaDto>;
    buscarPorId(id: number): Promise<RespuestaFranjaDto>;
    actualizar(id: number, dto: ActualizarFranjaDto): Promise<RespuestaFranjaDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
