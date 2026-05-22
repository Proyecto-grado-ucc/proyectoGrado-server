import { Repository } from 'typeorm';
import { Usuario } from '../../seguridad/entidades/usuario.entidad';
import { Estudiante } from '../entidades/estudiante.entidad';
import { ActualizarEstudianteDto } from './dto/actualizar-estudiante.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';
import { RespuestaEstudianteDto, RespuestaPaginadaEstudianteDto } from './dto/respuesta-estudiante.dto';
export declare class EstudiantesServicio {
    private readonly estudianteRepo;
    private readonly usuarioRepo;
    constructor(estudianteRepo: Repository<Estudiante>, usuarioRepo: Repository<Usuario>);
    crear(dto: CrearEstudianteDto): Promise<RespuestaEstudianteDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaEstudianteDto>;
    buscarPorId(id: number): Promise<RespuestaEstudianteDto>;
    actualizar(id: number, dto: ActualizarEstudianteDto): Promise<RespuestaEstudianteDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
