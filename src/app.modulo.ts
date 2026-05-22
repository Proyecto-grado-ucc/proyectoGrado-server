import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CompartidoModulo } from './compartido/compartido.modulo';
import { crearOpcionesTypeOrm } from './configuracion/typeorm.config';
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
      useFactory: () => crearOpcionesTypeOrm(),
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
