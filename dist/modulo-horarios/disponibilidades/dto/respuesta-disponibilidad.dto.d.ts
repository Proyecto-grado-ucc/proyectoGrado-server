export declare class RespuestaDisponibilidadDto {
    id: number;
    docenteId: number;
    docenteNombre: string;
    franjaHorariaId: number;
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    disponible: boolean;
}
export declare class RespuestaPaginadaDisponibilidadDto {
    items: RespuestaDisponibilidadDto[];
    total: number;
    page: number;
    size: number;
}
