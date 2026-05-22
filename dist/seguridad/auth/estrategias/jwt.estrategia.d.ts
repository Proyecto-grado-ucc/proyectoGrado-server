import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
export interface JwtPayload {
    sub: number;
    email: string;
    rol: string;
    tipo: string;
}
export interface UsuarioAutenticado {
    id: number;
    email: string;
    rol: string;
}
declare const JwtEstrategia_base: new (...args: any[]) => Strategy;
export declare class JwtEstrategia extends JwtEstrategia_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): UsuarioAutenticado;
}
export {};
