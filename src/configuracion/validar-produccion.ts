const VALORES_INSEGUROS = [
  'secreto_por_defecto',
  'secreto_por_defecto_cambiar',
  'change_me',
  'cambiar',
];

function esSecretoInseguro(valor: string | undefined): boolean {
  if (!valor) return true;
  const normalizado = valor.toLowerCase();
  return valor.length < 32 || VALORES_INSEGUROS.some((inseguro) => normalizado.includes(inseguro));
}

function obtenerValor(nombres: string[]): string | undefined {
  return nombres.map((nombre) => process.env[nombre]?.trim()).find(Boolean);
}

function esHostComposeLocal(host: string | undefined): boolean {
  const hostComposeLocal = ['d', 'b'].join('');
  return host?.trim().toLowerCase() === hostComposeLocal;
}

function validarConexionPostgres(): void {
  if (process.env.DATABASE_URL) return;

  const host = obtenerValor(['PGHOST', 'DB_HOST']);
  const port = obtenerValor(['PGPORT', 'DB_PORT']);
  const user = obtenerValor(['PGUSER', 'DB_USUARIO']);
  const password = obtenerValor(['PGPASSWORD', 'DB_CONTRASENA']);
  const database = obtenerValor(['PGDATABASE', 'DB_NOMBRE']);

  if (esHostComposeLocal(host)) {
    throw new Error(
      'El host de PostgreSQL apunta al servicio local de Compose. En Railway usa DATABASE_URL o las variables PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.',
    );
  }

  const faltantes = [
    ['host', host],
    ['port', port],
    ['user', user],
    ['password', password],
    ['database', database],
  ]
    .filter(([, valor]) => !valor)
    .map(([nombre]) => nombre);

  if (faltantes.length > 0) {
    throw new Error(
      `Faltan variables de PostgreSQL en produccion: ${faltantes.join(', ')}. En Railway usa DATABASE_URL o PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.`,
    );
  }

  if (!Number.isInteger(Number(port))) {
    throw new Error('El puerto de PostgreSQL debe ser un numero valido en produccion.');
  }
}

export function validarConfiguracionProduccion(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const requeridas = ['JWT_SECRETO', 'JWT_REFRESCO_SECRETO'];

  const faltantes = requeridas.filter((nombre) => !process.env[nombre]);
  if (faltantes.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas en produccion: ${faltantes.join(', ')}`,
    );
  }

  validarConexionPostgres();

  const secretosInseguros = ['JWT_SECRETO', 'JWT_REFRESCO_SECRETO'].filter((nombre) =>
    esSecretoInseguro(process.env[nombre]),
  );
  if (secretosInseguros.length > 0) {
    throw new Error(
      `Variables JWT inseguras en produccion: ${secretosInseguros.join(', ')}. Usa valores aleatorios de al menos 32 caracteres.`,
    );
  }
}
