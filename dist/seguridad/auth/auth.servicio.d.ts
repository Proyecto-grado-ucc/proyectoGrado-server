import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Sesion } from '../entidades/sesion.entidad';
import { Usuario } from '../entidades/usuario.entidad';
import { LoginDto } from './dto/login.dto';
import { RespuestaAuthDto } from './dto/respuesta-auth.dto';
export declare class AuthServicio {
    private readonly usuarioRepo;
    private readonly sesionRepo;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(usuarioRepo: Repository<Usuario>, sesionRepo: Repository<Sesion>, jwtService: JwtService, configService: ConfigService);
    login(dto: LoginDto, ipOrigen: string): Promise<RespuestaAuthDto>;
    refrescar(refreshToken: string): Promise<Pick<RespuestaAuthDto, 'access_token'>>;
    logout(usuarioId: number): Promise<void>;
    hashContrasena(contrasena: string): Promise<string>;
    private firmarAcceso;
    private firmarRefresco;
    private calcularExpiracion;
}
