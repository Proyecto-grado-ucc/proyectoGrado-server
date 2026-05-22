import { DisponibilidadesServicio } from './disponibilidades.servicio';
import { ActualizarDisponibilidadDto } from './dto/actualizar-disponibilidad.dto';
import { CrearDisponibilidadDto } from './dto/crear-disponibilidad.dto';
import { RespuestaDisponibilidadDto, RespuestaPaginadaDisponibilidadDto } from './dto/respuesta-disponibilidad.dto';
export declare class DisponibilidadesControlador {
    private readonly disponibilidadesServicio;
    constructor(disponibilidadesServicio: DisponibilidadesServicio);
    crear(dto: CrearDisponibilidadDto): Promise<RespuestaDisponibilidadDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaDisponibilidadDto>;
    buscarPorId(id: number): Promise<RespuestaDisponibilidadDto>;
    actualizar(id: number, dto: ActualizarDisponibilidadDto): Promise<RespuestaDisponibilidadDto>;
    eliminar(id: number): Promise<void>;
}
