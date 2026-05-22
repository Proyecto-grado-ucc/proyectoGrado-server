import { CursosServicio } from './cursos.servicio';
import { ActualizarCursoDto } from './dto/actualizar-curso.dto';
import { CrearCursoDto } from './dto/crear-curso.dto';
import { RespuestaCursoDto, RespuestaPaginadaCursoDto } from './dto/respuesta-curso.dto';
export declare class CursosControlador {
    private readonly cursosServicio;
    constructor(cursosServicio: CursosServicio);
    crear(dto: CrearCursoDto): Promise<RespuestaCursoDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaCursoDto>;
    buscarPorId(id: number): Promise<RespuestaCursoDto>;
    actualizar(id: number, dto: ActualizarCursoDto): Promise<RespuestaCursoDto>;
    eliminar(id: number): Promise<void>;
}
