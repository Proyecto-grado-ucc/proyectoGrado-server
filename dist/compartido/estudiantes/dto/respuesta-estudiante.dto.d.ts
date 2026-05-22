export declare class RespuestaEstudianteDto {
    id: number;
    usuarioId: number;
    usuarioNombre: string;
    usuarioEmail: string;
    grupoId: number | null;
}
export declare class RespuestaPaginadaEstudianteDto {
    items: RespuestaEstudianteDto[];
    total: number;
    page: number;
    size: number;
}
