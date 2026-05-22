import { RolNombre } from '../../entidades/rol.entidad';
export declare class CrearUsuarioDto {
    nombre: string;
    email: string;
    contrasena: string;
    rol: RolNombre;
    activo?: boolean;
}
