import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import dataSource from './data-source';
import { Rol, RolNombre } from './seguridad/entidades/rol.entidad';
import { Usuario } from './seguridad/entidades/usuario.entidad';

const rolesIniciales = [
  { nombre: RolNombre.Admin, descripcion: 'Acceso total al sistema' },
  { nombre: RolNombre.Docente, descripcion: 'Consulta de horario e indicadores propios' },
  { nombre: RolNombre.Estudiante, descripcion: 'Formularios de evaluacion y horario de grupo' },
];

function requerido(nombre: string): string {
  const valor = process.env[nombre]?.trim();
  if (!valor) throw new Error(`La variable ${nombre} es requerida para crear el Admin inicial`);
  return valor;
}

function rondasBcrypt(): number {
  const rondas = Number(process.env.BCRYPT_ROUNDS ?? 12);
  return Number.isFinite(rondas) && rondas >= 10 ? rondas : 12;
}

async function asegurarRoles(rolRepo: Repository<Rol>): Promise<Rol> {
  for (const datos of rolesIniciales) {
    const existente = await rolRepo.findOne({ where: { nombre: datos.nombre } });
    if (!existente) await rolRepo.save(rolRepo.create(datos));
  }

  const admin = await rolRepo.findOne({ where: { nombre: RolNombre.Admin } });
  if (!admin) throw new Error('No se pudo asegurar el rol Admin');
  return admin;
}

async function crearAdminInicial(): Promise<void> {
  const email = requerido('ADMIN_EMAIL').toLowerCase();
  const contrasena = requerido('ADMIN_CONTRASENA');
  const nombre = process.env.ADMIN_NOMBRE?.trim() || 'Administrador CAL';

  if (contrasena.length < 12) {
    throw new Error('ADMIN_CONTRASENA debe tener al menos 12 caracteres');
  }

  await dataSource.initialize();

  try {
    const rolRepo = dataSource.getRepository(Rol);
    const usuarioRepo = dataSource.getRepository(Usuario);
    const rolAdmin = await asegurarRoles(rolRepo);

    const existente = await usuarioRepo.findOne({
      where: { email },
      relations: ['rol'],
    });

    if (existente) {
      existente.rol = rolAdmin;
      existente.activo = true;
      existente.nombre = existente.nombre || nombre;

      if (process.env.ADMIN_ACTUALIZAR_CONTRASENA === 'true') {
        existente.passwordHash = await bcrypt.hash(contrasena, rondasBcrypt());
      }

      await usuarioRepo.save(existente);
      console.log(`Admin inicial verificado: ${email}`);
      return;
    }

    const passwordHash = await bcrypt.hash(contrasena, rondasBcrypt());
    await usuarioRepo.save(
      usuarioRepo.create({
        nombre,
        email,
        passwordHash,
        rol: rolAdmin,
        activo: true,
      }),
    );

    console.log(`Admin inicial creado: ${email}`);
  } finally {
    await dataSource.destroy();
  }
}

crearAdminInicial().catch((error: Error) => {
  console.error(error.message);
  process.exit(1);
});
