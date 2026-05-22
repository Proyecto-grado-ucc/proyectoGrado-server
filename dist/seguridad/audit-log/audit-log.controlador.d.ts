import { AuditLogServicio } from './audit-log.servicio';
import { RespuestaPaginadaAuditLogDto } from './dto/respuesta-audit-log.dto';
export declare class AuditLogControlador {
    private readonly auditLogServicio;
    constructor(auditLogServicio: AuditLogServicio);
    listar(page?: number, size?: number, entidad?: string, fechaDesde?: string, fechaHasta?: string): Promise<RespuestaPaginadaAuditLogDto>;
}
