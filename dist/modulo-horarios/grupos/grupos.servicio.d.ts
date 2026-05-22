import { Repository } from 'typeorm';
import { Curso } from '../entidades/curso.entidad';
import { Grupo } from '../entidades/grupo.entidad';
import { ActualizarGrupoDto } from './dto/actualizar-grupo.dto';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { RespuestaGrupoDto, RespuestaPaginadaGrupoDto } from './dto/respuesta-grupo.dto';
export declare class GruposServicio {
    private readonly grupoRepo;
    private readonly cursoRepo;
    constructor(grupoRepo: Repository<Grupo>, cursoRepo: Repository<Curso>);
    crear(dto: CrearGrupoDto): Promise<RespuestaGrupoDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaGrupoDto>;
    buscarPorId(id: number): Promise<RespuestaGrupoDto>;
    actualizar(id: number, dto: ActualizarGrupoDto): Promise<RespuestaGrupoDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
