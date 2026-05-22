export declare class RespuestaEjecucionKddDto {
    resultados: number;
    alertas: number;
}
export declare class RespuestaResultadoKddDto {
    id: number;
    periodoId: number;
    docenteId: number;
    puntuacionGlobal: number;
    totalEvaluaciones: number;
    detalleDimensiones: Record<string, number>;
    creadoEn: Date;
}
