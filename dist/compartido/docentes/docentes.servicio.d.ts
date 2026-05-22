import { Repository } from 'typeorm';
import { Usuario } from '../../seguridad/entidades/usuario.entidad';
import { Docente } from '../entidades/docente.entidad';
import { ActualizarDocenteDto } from './dto/actualizar-docente.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { RespuestaDocenteDto, RespuestaPaginadaDocenteDto } from './dto/respuesta-docente.dto';
export declare class DocentesServicio {
    private readonly docenteRepo;
    private readonly usuarioRepo;
    constructor(docenteRepo: Repository<Docente>, usuarioRepo: Repository<Usuario>);
    crear(dto: CrearDocenteDto): Promise<RespuestaDocenteDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaDocenteDto>;
    buscarPorId(id: number): Promise<RespuestaDocenteDto>;
    actualizar(id: number, dto: ActualizarDocenteDto): Promise<RespuestaDocenteDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
