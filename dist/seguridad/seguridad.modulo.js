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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeguridadModulo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeguridadModulo = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const audit_log_entidad_1 = require("./entidades/audit-log.entidad");
const permiso_entidad_1 = require("./entidades/permiso.entidad");
const rol_entidad_1 = require("./entidades/rol.entidad");
const sesion_entidad_1 = require("./entidades/sesion.entidad");
const usuario_entidad_1 = require("./entidades/usuario.entidad");
const auth_servicio_1 = require("./auth/auth.servicio");
const auth_controlador_1 = require("./auth/auth.controlador");
const jwt_estrategia_1 = require("./auth/estrategias/jwt.estrategia");
const jwt_guardia_1 = require("./auth/guardias/jwt.guardia");
const roles_guardia_1 = require("./auth/guardias/roles.guardia");
const audit_log_servicio_1 = require("./audit-log/audit-log.servicio");
const audit_log_controlador_1 = require("./audit-log/audit-log.controlador");
const usuarios_servicio_1 = require("./usuarios/usuarios.servicio");
const usuarios_controlador_1 = require("./usuarios/usuarios.controlador");
const auditar_interceptor_1 = require("./decoradores/auditar.interceptor");
let SeguridadModulo = SeguridadModulo_1 = class SeguridadModulo {
    constructor(rolRepo) {
        this.rolRepo = rolRepo;
        this.logger = new common_1.Logger(SeguridadModulo_1.name);
    }
    async onModuleInit() {
        await this.sembrarRoles();
    }
    async sembrarRoles() {
        const rolesIniciales = [
            { nombre: rol_entidad_1.RolNombre.Admin, descripcion: 'Acceso total al sistema' },
            { nombre: rol_entidad_1.RolNombre.Docente, descripcion: 'Consulta de horario e indicadores propios' },
            { nombre: rol_entidad_1.RolNombre.Estudiante, descripcion: 'Formularios de evaluación y horario de grupo' },
        ];
        for (const datos of rolesIniciales) {
            const existe = await this.rolRepo.findOne({ where: { nombre: datos.nombre } });
            if (!existe) {
                await this.rolRepo.save(this.rolRepo.create(datos));
                this.logger.log(`Rol '${datos.nombre}' creado`);
            }
        }
    }
};
exports.SeguridadModulo = SeguridadModulo;
exports.SeguridadModulo = SeguridadModulo = SeguridadModulo_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRETO', 'secreto_por_defecto_cambiar'),
                    signOptions: { expiresIn: config.get('JWT_EXPIRACION', '8h') },
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([rol_entidad_1.Rol, permiso_entidad_1.Permiso, usuario_entidad_1.Usuario, sesion_entidad_1.Sesion, audit_log_entidad_1.AuditLog]),
        ],
        providers: [
            auth_servicio_1.AuthServicio,
            usuarios_servicio_1.UsuariosServicio,
            audit_log_servicio_1.AuditLogServicio,
            jwt_estrategia_1.JwtEstrategia,
            jwt_guardia_1.JwtGuardia,
            roles_guardia_1.RolesGuardia,
            { provide: core_1.APP_INTERCEPTOR, useClass: auditar_interceptor_1.AuditarInterceptor },
        ],
        controllers: [auth_controlador_1.AuthControlador, usuarios_controlador_1.UsuariosControlador, audit_log_controlador_1.AuditLogControlador],
        exports: [auth_servicio_1.AuthServicio, usuarios_servicio_1.UsuariosServicio, audit_log_servicio_1.AuditLogServicio, jwt_guardia_1.JwtGuardia, roles_guardia_1.RolesGuardia],
    }),
    __param(0, (0, typeorm_2.InjectRepository)(rol_entidad_1.Rol)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], SeguridadModulo);
//# sourceMappingURL=seguridad.modulo.js.map