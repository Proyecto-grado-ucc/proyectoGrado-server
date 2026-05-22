import { ActualizarGrupoDto } from './dto/actualizar-grupo.dto';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { RespuestaGrupoDto, RespuestaPaginadaGrupoDto } from './dto/respuesta-grupo.dto';
import { GruposServicio } from './grupos.servicio';
export declare class GruposControlador {
    private readonly gruposServicio;
    constructor(gruposServicio: GruposServicio);
    crear(dto: CrearGrupoDto): Promise<RespuestaGrupoDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaGrupoDto>;
    buscarPorId(id: number): Promise<RespuestaGrupoDto>;
    actualizar(id: number, dto: ActualizarGrupoDto): Promise<RespuestaGrupoDto>;
    eliminar(id: number): Promise<void>;
}
