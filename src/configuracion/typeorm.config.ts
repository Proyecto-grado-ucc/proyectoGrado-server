import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

function numeroDesdeEntorno(valor: string | undefined, valorPorDefecto: number): number {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : valorPorDefecto;
}

function booleanoDesdeEntorno(valor: string | undefined): boolean {
  if (!valor) return false;
  return ['1', 'true', 'yes', 'si'].includes(valor.trim().toLowerCase());
}

function usarSsl(env: NodeJS.ProcessEnv): boolean {
  if (env.DB_SSL !== undefined) return booleanoDesdeEntorno(env.DB_SSL);
  return env.DATABASE_URL?.includes('sslmode=require') ?? false;
}

export function crearOpcionesTypeOrm(
  env: NodeJS.ProcessEnv = process.env,
): PostgresConnectionOptions {
  const baseDir = join(__dirname, '..');
  const nodeEnv = env.NODE_ENV ?? 'development';
  const databaseUrl = env.DATABASE_URL;
  const conexion = databaseUrl
    ? { url: databaseUrl }
    : {
        host: env.DB_HOST ?? 'localhost',
        port: numeroDesdeEntorno(env.DB_PORT, 5432),
        username: env.DB_USUARIO ?? 'cal_usuario',
        password: env.DB_CONTRASENA ?? 'cal_contrasena',
        database: env.DB_NOMBRE ?? 'cal_db',
      };
  const ssl = usarSsl(env)
    ? {
        ssl: {
          rejectUnauthorized: booleanoDesdeEntorno(env.DB_SSL_REJECT_UNAUTHORIZED),
        },
      }
    : {};

  return {
    type: 'postgres',
    ...conexion,
    ...ssl,
    entities: [join(baseDir, '**', '*.entidad{.ts,.js}')],
    migrations: [join(baseDir, 'migraciones', '*{.ts,.js}')],
    synchronize: nodeEnv !== 'production' && env.TYPEORM_SYNCHRONIZE !== 'false',
    logging: nodeEnv === 'development',
  };
}
