import { Request } from 'express';
import { UsuarioAutenticado } from './estrategias/jwt.estrategia';
import { AuthServicio } from './auth.servicio';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RespuestaAuthDto } from './dto/respuesta-auth.dto';
export declare class AuthControlador {
    private readonly authServicio;
    constructor(authServicio: AuthServicio);
    login(dto: LoginDto, req: Request): Promise<RespuestaAuthDto>;
    refrescar(dto: RefreshTokenDto): Promise<Pick<RespuestaAuthDto, 'access_token'>>;
    logout(usuario: UsuarioAutenticado): Promise<void>;
}
