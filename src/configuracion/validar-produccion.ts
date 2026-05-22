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

export function validarConfiguracionProduccion(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const requeridas = ['JWT_SECRETO', 'JWT_REFRESCO_SECRETO'];
  if (!process.env.DATABASE_URL) {
    requeridas.push('DB_HOST', 'DB_PORT', 'DB_USUARIO', 'DB_CONTRASENA', 'DB_NOMBRE');
  }

  const faltantes = requeridas.filter((nombre) => !process.env[nombre]);
  if (faltantes.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas en produccion: ${faltantes.join(', ')}`,
    );
  }

  if (!process.env.DATABASE_URL && process.env.DB_HOST?.trim().toLowerCase() === 'db') {
    throw new Error(
      'DB_HOST=db solo existe dentro de docker-compose local. En Railway configura DB_HOST=${{Postgres.PGHOST}} o DATABASE_URL=${{Postgres.DATABASE_URL}}.',
    );
  }

  if (!process.env.DATABASE_URL && !Number.isInteger(Number(process.env.DB_PORT))) {
    throw new Error('DB_PORT debe ser un numero valido en produccion.');
  }

  const secretosInseguros = ['JWT_SECRETO', 'JWT_REFRESCO_SECRETO'].filter((nombre) =>
    esSecretoInseguro(process.env[nombre]),
  );
  if (secretosInseguros.length > 0) {
    throw new Error(
      `Variables JWT inseguras en produccion: ${secretosInseguros.join(', ')}. Usa valores aleatorios de al menos 32 caracteres.`,
    );
  }
}
