export declare class AuditLog {
    id: number;
    usuarioId: number | null;
    usuario: unknown;
    accion: string;
    entidad: string;
    entidadId: string | null;
    timestamp: Date;
    datosPrevios: Record<string, unknown> | null;
    datosNuevos: Record<string, unknown> | null;
}
