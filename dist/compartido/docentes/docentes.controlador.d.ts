import { ActualizarDocenteDto } from './dto/actualizar-docente.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { RespuestaDocenteDto, RespuestaPaginadaDocenteDto } from './dto/respuesta-docente.dto';
import { DocentesServicio } from './docentes.servicio';
export declare class DocentesControlador {
    private readonly docentesServicio;
    constructor(docentesServicio: DocentesServicio);
    crear(dto: CrearDocenteDto): Promise<RespuestaDocenteDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaDocenteDto>;
    buscarPorId(id: number): Promise<RespuestaDocenteDto>;
    actualizar(id: number, dto: ActualizarDocenteDto): Promise<RespuestaDocenteDto>;
    eliminar(id: number): Promise<void>;
}
