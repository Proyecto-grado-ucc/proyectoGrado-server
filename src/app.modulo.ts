import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CompartidoModulo } from './compartido/compartido.modulo';
import { SaludModulo } from './core/salud/salud.modulo';
import { ModuloEvaluacionModulo } from './modulo-evaluacion/modulo-evaluacion.modulo';
import { ModuloHorariosModulo } from './modulo-horarios/modulo-horarios.modulo';
import { SeguridadModulo } from './seguridad/seguridad.modulo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL', 60_000),
          limit: config.get<number>('THROTTLE_LIMIT', 100),
        },
      ],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const nodeEnv = config.get<string>('NODE_ENV', 'development');
        const migrationsRun = config.get<string>(
          'TYPEORM_MIGRATIONS_RUN',
          nodeEnv === 'production' ? 'true' : 'false',
        );
        const synchronize = config.get<string>(
          'TYPEORM_SYNC',
          nodeEnv === 'production' ? 'false' : 'true',
        );

        return {
          type: 'postgres',
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: config.get<string>('DB_HOST', 'localhost'),
                port: config.get<number>('DB_PORT', 5432),
                username: config.get<string>('DB_USUARIO', 'cal_usuario'),
                password: config.get<string>('DB_CONTRASENA', 'cal_contrasena'),
                database: config.get<string>('DB_NOMBRE', 'cal_db'),
              }),
          entities: [__dirname + '/**/*.entidad{.ts,.js}'],
          migrations: [__dirname + '/migraciones/*{.ts,.js}'],
          migrationsRun: migrationsRun === 'true',
          synchronize: synchronize === 'true',
          logging: nodeEnv === 'development',
          ssl:
            config.get<string>('DB_SSL', 'false') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
    SaludModulo,
    SeguridadModulo,
    CompartidoModulo,
    ModuloHorariosModulo,
    ModuloEvaluacionModulo,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModulo {}
