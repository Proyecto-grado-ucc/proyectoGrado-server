import { Jornada } from '../../entidades/grupo.entidad';
export declare class RespuestaGrupoDto {
    id: number;
    codigo: string;
    cursoId: number;
    cursoNombre: string;
    cupoMax: number;
    jornada: Jornada;
}
export declare class RespuestaPaginadaGrupoDto {
    items: RespuestaGrupoDto[];
    total: number;
    page: number;
    size: number;
}
