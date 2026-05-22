import { RolNombre } from '../entidades/rol.entidad';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RolNombre[]) => import("@nestjs/common").CustomDecorator<string>;
