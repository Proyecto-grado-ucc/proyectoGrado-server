import { Rol } from './rol.entidad';
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: Rol;
    activo: boolean;
    fechaCreacion: Date;
    sesiones: unknown[];
}
