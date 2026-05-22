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

function usarSsl(env: NodeJS.ProcessEnv, nodeEnv: string): boolean {
  if (env.DB_SSL !== undefined) return booleanoDesdeEntorno(env.DB_SSL);
  if (env.PGSSLMODE === 'require') return true;
  if (nodeEnv === 'production') return true;
  return env.DATABASE_URL?.includes('sslmode=require') ?? false;
}

function obtenerValor(env: NodeJS.ProcessEnv, nombres: string[]): string | undefined {
  return nombres.map((nombre) => env[nombre]?.trim()).find(Boolean);
}

function esHostComposeLocal(host: string | undefined): boolean {
  const hostComposeLocal = ['d', 'b'].join('');
  return host?.trim().toLowerCase() === hostComposeLocal;
}

function obtenerConfigPg(env: NodeJS.ProcessEnv): {
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  database?: string;
} {
  return {
    host: obtenerValor(env, ['PGHOST', 'DB_HOST']),
    port: obtenerValor(env, ['PGPORT', 'DB_PORT']),
    username: obtenerValor(env, ['PGUSER', 'DB_USUARIO']),
    password: obtenerValor(env, ['PGPASSWORD', 'DB_CONTRASENA']),
    database: obtenerValor(env, ['PGDATABASE', 'DB_NOMBRE']),
  };
}

function validarHostNoCompose(host: string | undefined): void {
  if (!esHostComposeLocal(host)) return;
  throw new Error(
    'El host de PostgreSQL apunta al servicio local de Compose. En Railway usa DATABASE_URL o las variables PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.',
  );
}

function validarConexion(env: NodeJS.ProcessEnv, configPg: ReturnType<typeof obtenerConfigPg>): void {
  if (env.DATABASE_URL) return;

  validarHostNoCompose(configPg.host);

  const faltantes = [
    ['host', configPg.host],
    ['port', configPg.port],
    ['user', configPg.username],
    ['password', configPg.password],
    ['database', configPg.database],
  ]
    .filter(([, valor]) => !valor)
    .map(([nombre]) => nombre);

  if ((env.NODE_ENV ?? 'development') !== 'production' && faltantes.length === 5) {
    throw new Error(
      'No hay configuracion de PostgreSQL. Define DATABASE_URL, variables PG* o variables DB_* en tu entorno local.',
    );
  }

  if (faltantes.length > 0) {
    throw new Error(
      `Configuracion de PostgreSQL incompleta. Faltan: ${faltantes.join(', ')}. En Railway usa DATABASE_URL o PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.`,
    );
  }

  if (!Number.isInteger(Number(configPg.port))) {
    throw new Error('El puerto de PostgreSQL debe ser un numero valido.');
  }
}

export function crearOpcionesTypeOrm(
  env: NodeJS.ProcessEnv = process.env,
): PostgresConnectionOptions {
  const baseDir = join(__dirname, '..');
  const nodeEnv = env.NODE_ENV ?? 'development';
  const urlConexion = env.DATABASE_URL;
  const configPg = obtenerConfigPg(env);

  validarConexion(env, configPg);

  const conexion = urlConexion
    ? { url: urlConexion }
    : {
        host: configPg.host,
        port: numeroDesdeEntorno(configPg.port, 5432),
        username: configPg.username,
        password: configPg.password,
        database: configPg.database,
      };
  const ssl = usarSsl(env, nodeEnv)
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
