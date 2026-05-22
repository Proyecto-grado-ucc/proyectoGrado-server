import { TipoAula } from '../../entidades/aula.entidad';
export declare class CrearAulaDto {
    codigo: string;
    capacidad: number;
    tipo: TipoAula;
    activa?: boolean;
}
