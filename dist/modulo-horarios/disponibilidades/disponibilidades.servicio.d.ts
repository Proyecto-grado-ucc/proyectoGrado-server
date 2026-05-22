import { Repository } from 'typeorm';
import { Docente } from '../../compartido/entidades/docente.entidad';
import { Disponibilidad } from '../entidades/disponibilidad.entidad';
import { FranjaHoraria } from '../entidades/franja-horaria.entidad';
import { ActualizarDisponibilidadDto } from './dto/actualizar-disponibilidad.dto';
import { CrearDisponibilidadDto } from './dto/crear-disponibilidad.dto';
import { RespuestaDisponibilidadDto, RespuestaPaginadaDisponibilidadDto } from './dto/respuesta-disponibilidad.dto';
export declare class DisponibilidadesServicio {
    private readonly dispRepo;
    private readonly docenteRepo;
    private readonly franjaRepo;
    constructor(dispRepo: Repository<Disponibilidad>, docenteRepo: Repository<Docente>, franjaRepo: Repository<FranjaHoraria>);
    crear(dto: CrearDisponibilidadDto): Promise<RespuestaDisponibilidadDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaDisponibilidadDto>;
    buscarPorId(id: number): Promise<RespuestaDisponibilidadDto>;
    actualizar(id: number, dto: ActualizarDisponibilidadDto): Promise<RespuestaDisponibilidadDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
