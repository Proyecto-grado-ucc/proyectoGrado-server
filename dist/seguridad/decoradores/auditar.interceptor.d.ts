import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuditLogServicio } from '../audit-log/audit-log.servicio';
export declare class AuditarInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly auditLogServicio;
    constructor(reflector: Reflector, auditLogServicio: AuditLogServicio);
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
