export declare class RespuestaPeriodoDto {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
}
export declare class RespuestaPaginadaPeriodoDto {
    items: RespuestaPeriodoDto[];
    total: number;
    page: number;
    size: number;
}
