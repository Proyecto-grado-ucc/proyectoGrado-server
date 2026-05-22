import { Usuario } from '../../seguridad/entidades/usuario.entidad';
export declare class Docente {
    id: number;
    usuario: Usuario;
    especialidad: string | null;
    cargaMaximaHoras: number;
    disponibilidades: unknown[];
}
