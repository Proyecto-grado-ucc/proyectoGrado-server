import { Repository } from 'typeorm';
import { AuditLog } from '../entidades/audit-log.entidad';
import { RespuestaPaginadaAuditLogDto } from './dto/respuesta-audit-log.dto';
export interface RegistrarAuditDto {
    usuarioId?: number | null;
    accion: string;
    entidad: string;
    entidadId?: string | null;
    datosPrevios?: Record<string, unknown> | null;
    datosNuevos?: Record<string, unknown> | null;
}
export declare class AuditLogServicio {
    private readonly auditLogRepo;
    constructor(auditLogRepo: Repository<AuditLog>);
    registrar(dto: RegistrarAuditDto): Promise<void>;
    listar(page: number, size: number, filtros: {
        entidad?: string;
        fechaDesde?: string;
        fechaHasta?: string;
    }): Promise<RespuestaPaginadaAuditLogDto>;
}
