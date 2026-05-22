import { TipoAula } from '../../entidades/aula.entidad';
export declare class RespuestaAulaDto {
    id: number;
    codigo: string;
    capacidad: number;
    tipo: TipoAula;
    activa: boolean;
}
export declare class RespuestaPaginadaAulaDto {
    items: RespuestaAulaDto[];
    total: number;
    page: number;
    size: number;
}
