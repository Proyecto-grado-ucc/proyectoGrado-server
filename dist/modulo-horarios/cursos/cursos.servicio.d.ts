import { Repository } from 'typeorm';
import { Curso } from '../entidades/curso.entidad';
import { NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { ActualizarCursoDto } from './dto/actualizar-curso.dto';
import { CrearCursoDto } from './dto/crear-curso.dto';
import { RespuestaCursoDto, RespuestaPaginadaCursoDto } from './dto/respuesta-curso.dto';
export declare class CursosServicio {
    private readonly cursoRepo;
    private readonly nivelRepo;
    constructor(cursoRepo: Repository<Curso>, nivelRepo: Repository<NivelIdioma>);
    crear(dto: CrearCursoDto): Promise<RespuestaCursoDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaCursoDto>;
    buscarPorId(id: number): Promise<RespuestaCursoDto>;
    actualizar(id: number, dto: ActualizarCursoDto): Promise<RespuestaCursoDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
