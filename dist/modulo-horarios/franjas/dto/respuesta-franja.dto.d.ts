import { DiaSemana } from '../../entidades/franja-horaria.entidad';
export declare class RespuestaFranjaDto {
    id: number;
    diaSemana: DiaSemana;
    horaInicio: string;
    horaFin: string;
    bloqueIdx: number;
}
export declare class RespuestaPaginadaFranjaDto {
    items: RespuestaFranjaDto[];
    total: number;
    page: number;
    size: number;
}
