"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditarInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const audit_log_servicio_1 = require("../audit-log/audit-log.servicio");
const auditar_decorador_1 = require("./auditar.decorador");
const METODOS_MUTACION = ['POST', 'PATCH', 'PUT', 'DELETE'];
const CAMPOS_SENSIBLES = ['contrasena', 'passwordHash', 'password', 'token'];
function limpiarSensibles(obj) {
    const copia = { ...obj };
    for (const campo of CAMPOS_SENSIBLES) {
        if (campo in copia)
            delete copia[campo];
    }
    return copia;
}
let AuditarInterceptor = class AuditarInterceptor {
    constructor(reflector, auditLogServicio) {
        this.reflector = reflector;
        this.auditLogServicio = auditLogServicio;
    }
    intercept(context, next) {
        const entidad = this.reflector.get(auditar_decorador_1.AUDIT_ENTIDAD_KEY, context.getHandler());
        if (!entidad)
            return next.handle();
        const req = context.switchToHttp().getRequest();
        if (!METODOS_MUTACION.includes(req.method))
            return next.handle();
        const datosEntrada = req.body && typeof req.body === 'object'
            ? limpiarSensibles(req.body)
            : null;
        return next.handle().pipe((0, rxjs_1.tap)((respuesta) => {
            const entidadId = req.params?.['id'] ??
                (respuesta && typeof respuesta === 'object'
                    ? String(respuesta['id'] ?? '')
                    : null);
            const datosNuevos = respuesta && typeof respuesta === 'object'
                ? limpiarSensibles(respuesta)
                : datosEntrada;
            this.auditLogServicio
                .registrar({
                usuarioId: req.user?.id ?? null,
                accion: req.method,
                entidad,
                entidadId: entidadId || null,
                datosPrevios: null,
                datosNuevos,
            })
                .catch(() => {
            });
        }));
    }
};
exports.AuditarInterceptor = AuditarInterceptor;
exports.AuditarInterceptor = AuditarInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        audit_log_servicio_1.AuditLogServicio])
], AuditarInterceptor);
//# sourceMappingURL=auditar.interceptor.js.map