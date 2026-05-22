import { ActualizarEstudianteDto } from './dto/actualizar-estudiante.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';
import { RespuestaEstudianteDto, RespuestaPaginadaEstudianteDto } from './dto/respuesta-estudiante.dto';
import { EstudiantesServicio } from './estudiantes.servicio';
export declare class EstudiantesControlador {
    private readonly estudiantesServicio;
    constructor(estudiantesServicio: EstudiantesServicio);
    crear(dto: CrearEstudianteDto): Promise<RespuestaEstudianteDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaEstudianteDto>;
    buscarPorId(id: number): Promise<RespuestaEstudianteDto>;
    actualizar(id: number, dto: ActualizarEstudianteDto): Promise<RespuestaEstudianteDto>;
    eliminar(id: number): Promise<void>;
}
