import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { RespuestaPaginadaUsuarioDto, RespuestaUsuarioDto } from './dto/respuesta-usuario.dto';
import { UsuariosServicio } from './usuarios.servicio';
export declare class UsuariosControlador {
    private readonly usuariosServicio;
    constructor(usuariosServicio: UsuariosServicio);
    crear(dto: CrearUsuarioDto): Promise<RespuestaUsuarioDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaUsuarioDto>;
    buscarPorId(id: number): Promise<RespuestaUsuarioDto>;
    actualizar(id: number, dto: ActualizarUsuarioDto): Promise<RespuestaUsuarioDto>;
    eliminar(id: number): Promise<void>;
}
