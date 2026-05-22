"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModulo = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const compartido_modulo_1 = require("./compartido/compartido.modulo");
const salud_modulo_1 = require("./core/salud/salud.modulo");
const modulo_evaluacion_modulo_1 = require("./modulo-evaluacion/modulo-evaluacion.modulo");
const modulo_horarios_modulo_1 = require("./modulo-horarios/modulo-horarios.modulo");
const seguridad_modulo_1 = require("./seguridad/seguridad.modulo");
let AppModulo = class AppModulo {
};
exports.AppModulo = AppModulo;
exports.AppModulo = AppModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => [
                    {
                        ttl: config.get('THROTTLE_TTL', 60_000),
                        limit: config.get('THROTTLE_LIMIT', 100),
                    },
                ],
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 5432),
                    username: config.get('DB_USUARIO', 'cal_usuario'),
                    password: config.get('DB_CONTRASENA', 'cal_contrasena'),
                    database: config.get('DB_NOMBRE', 'cal_db'),
                    entities: [__dirname + '/**/*.entidad{.ts,.js}'],
                    migrations: [__dirname + '/migraciones/*{.ts,.js}'],
                    synchronize: config.get('NODE_ENV') !== 'production',
                    logging: config.get('NODE_ENV') === 'development',
                }),
                inject: [config_1.ConfigService],
            }),
            salud_modulo_1.SaludModulo,
            seguridad_modulo_1.SeguridadModulo,
            compartido_modulo_1.CompartidoModulo,
            modulo_horarios_modulo_1.ModuloHorariosModulo,
            modulo_evaluacion_modulo_1.ModuloEvaluacionModulo,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModulo);
//# sourceMappingURL=app.modulo.js.map