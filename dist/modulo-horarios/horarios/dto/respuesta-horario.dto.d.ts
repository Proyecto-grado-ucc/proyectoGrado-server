declare class AsignacionDto {
    grupoId: number;
    docenteId: number;
    aulaId: number;
    franjaId: number;
}
export declare class RespuestaHorarioDto {
    id: number;
    periodoId: number;
    periodoNombre: string;
    asignaciones: AsignacionDto[];
    fitness: number;
    generaciones: number;
    tiempoMs: number;
    creadoEn: Date;
}
export declare class RespuestaPaginadaHorarioDto {
    items: RespuestaHorarioDto[];
    total: number;
    page: number;
    size: number;
}
export {};
