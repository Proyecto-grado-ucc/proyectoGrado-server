import { Repository } from 'typeorm';
import { Rol } from '../entidades/rol.entidad';
import { Usuario } from '../entidades/usuario.entidad';
import { AuthServicio } from '../auth/auth.servicio';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { RespuestaPaginadaUsuarioDto, RespuestaUsuarioDto } from './dto/respuesta-usuario.dto';
export declare class UsuariosServicio {
    private readonly usuarioRepo;
    private readonly rolRepo;
    private readonly authServicio;
    constructor(usuarioRepo: Repository<Usuario>, rolRepo: Repository<Rol>, authServicio: AuthServicio);
    crear(dto: CrearUsuarioDto): Promise<RespuestaUsuarioDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaUsuarioDto>;
    buscarPorId(id: number): Promise<RespuestaUsuarioDto>;
    actualizar(id: number, dto: ActualizarUsuarioDto): Promise<RespuestaUsuarioDto>;
    eliminar(id: number): Promise<void>;
    private mapearRespuesta;
}
