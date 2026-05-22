export declare class DistribucionDto {
    rango: string;
    cantidad: number;
}
export declare class RespuestaDashboardDto {
    totalDocentes: number;
    totalEvaluaciones: number;
    promedioGlobal: number;
    alertasCriticas: number;
    alertasAdvertencia: number;
    distribucionPuntuaciones: DistribucionDto[];
}
