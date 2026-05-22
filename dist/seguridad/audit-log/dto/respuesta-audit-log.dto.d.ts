export declare class RespuestaAuditLogDto {
    id: number;
    usuarioId: number | null;
    accion: string;
    entidad: string;
    entidadId: string | null;
    timestamp: Date;
    datosPrevios: Record<string, unknown> | null;
    datosNuevos: Record<string, unknown> | null;
}
export declare class RespuestaPaginadaAuditLogDto {
    items: RespuestaAuditLogDto[];
    total: number;
    page: number;
    size: number;
}
