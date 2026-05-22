import { Usuario } from './usuario.entidad';
export declare class Sesion {
    id: number;
    usuario: Usuario;
    tokenJwt: string;
    fechaEmision: Date;
    fechaExpiracion: Date;
    ipOrigen: string | null;
}
