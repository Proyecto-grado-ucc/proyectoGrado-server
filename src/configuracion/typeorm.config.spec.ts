import { crearOpcionesTypeOrm } from './typeorm.config';

describe('crearOpcionesTypeOrm', () => {
  it('prioriza DATABASE_URL sobre variables PG*', () => {
    const opciones = crearOpcionesTypeOrm({
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://usuario:contrasena@railway-url.internal:5432/cal',
      PGHOST: 'ignored-host',
      PGPORT: '1111',
      PGUSER: 'ignored',
      PGPASSWORD: 'ignored',
      PGDATABASE: 'ignored',
    });

    expect(opciones.url).toBe('postgresql://usuario:contrasena@railway-url.internal:5432/cal');
    expect(opciones.host).toBeUndefined();
    expect(opciones.ssl).toEqual({ rejectUnauthorized: false });
    expect(opciones.synchronize).toBe(false);
  });

  it('usa variables PG* de Railway cuando no existe DATABASE_URL', () => {
    const opciones = crearOpcionesTypeOrm({
      NODE_ENV: 'production',
      PGHOST: 'railway-postgres.internal',
      PGPORT: '5432',
      PGUSER: 'cal_user',
      PGPASSWORD: 'cal_password',
      PGDATABASE: 'cal_database',
    });

    expect(opciones.host).toBe('railway-postgres.internal');
    expect(opciones.port).toBe(5432);
    expect(opcionesSinContrasena(opciones)).toMatchObject({
      username: 'cal_user',
      database: 'cal_database',
      ssl: { rejectUnauthorized: false },
      synchronize: false,
    });
  });

  it('rechaza el host del servicio local de Compose en produccion', () => {
    expect(() =>
      crearOpcionesTypeOrm({
        NODE_ENV: 'production',
        DB_HOST: ['d', 'b'].join(''),
        DB_PORT: '5432',
        DB_USUARIO: 'usuario',
        DB_CONTRASENA: 'contrasena',
        DB_NOMBRE: 'cal_database',
      }),
    ).toThrow(/Compose/);
  });
});

function opcionesSinContrasena<T extends { password?: unknown }>(opciones: T): Omit<T, 'password'> {
  const { password: _password, ...resto } = opciones;
  return resto;
}
