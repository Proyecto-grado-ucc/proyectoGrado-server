export declare class RespuestaDocenteDto {
    id: number;
    usuarioId: number;
    usuarioNombre: string;
    usuarioEmail: string;
    especialidad: string | null;
    cargaMaximaHoras: number;
}
export declare class RespuestaPaginadaDocenteDto {
    items: RespuestaDocenteDto[];
    total: number;
    page: number;
    size: number;
}
