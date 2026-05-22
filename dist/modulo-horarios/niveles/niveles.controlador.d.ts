import { ActualizarNivelDto } from './dto/actualizar-nivel.dto';
import { CrearNivelDto } from './dto/crear-nivel.dto';
import { RespuestaNivelDto, RespuestaPaginadaNivelDto } from './dto/respuesta-nivel.dto';
import { NivelesServicio } from './niveles.servicio';
export declare class NivelesControlador {
    private readonly nivelesServicio;
    constructor(nivelesServicio: NivelesServicio);
    crear(dto: CrearNivelDto): Promise<RespuestaNivelDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaNivelDto>;
    buscarPorId(id: number): Promise<RespuestaNivelDto>;
    actualizar(id: number, dto: ActualizarNivelDto): Promise<RespuestaNivelDto>;
    eliminar(id: number): Promise<void>;
}
