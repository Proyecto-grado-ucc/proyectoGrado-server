# Despliegue backend en Railway

Este backend debe desplegarse como servicio Node/NestJS con PostgreSQL en Railway. La API usa el prefijo global `/api`, por lo que las pruebas iniciales son `/api/salud`, `/api/docs` y `/api/auth/login`.

Railway detecta automaticamente el `Dockerfile` de este repositorio. Ese `Dockerfile` ya esta preparado para produccion: instala con `npm ci`, compila con `npm run build` y arranca con `npm run start`. No depende de `docker-compose.yml`.

## 1. Preparar Railway

1. Crear un proyecto nuevo en Railway.
2. Agregar un servicio PostgreSQL al proyecto.
3. Conectar el repositorio personal `proyectoGrado-server`.
4. Seleccionar la rama de despliegue `backend/sistema-cal-completo-d` cuando los cambios de `dev` ya esten fusionados.

## 2. Variables de entorno

Configurar estas variables en el servicio backend:

```bash
NODE_ENV=production
# Railway define PORT automaticamente; no lo sobrescribas salvo que el panel lo requiera.

# Opcion recomendada en Railway si se expone desde el plugin PostgreSQL:
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Alternativa si no se usa DATABASE_URL:
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USUARIO=${{Postgres.PGUSER}}
DB_CONTRASENA=${{Postgres.PGPASSWORD}}
DB_NOMBRE=${{Postgres.PGDATABASE}}

JWT_SECRETO=<valor-aleatorio-de-32-caracteres-o-mas>
JWT_EXPIRACION=15m
JWT_REFRESCO_SECRETO=<otro-valor-aleatorio-de-32-caracteres-o-mas>
JWT_REFRESCO_EXPIRACION=7d

CORS_ORIGINS=https://tu-frontend.example.com,http://localhost:5173
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
BCRYPT_ROUNDS=12

ADMIN_EMAIL=admin@cambridge.example
ADMIN_NOMBRE=Administrador CAL
ADMIN_CONTRASENA=<contrasena-segura-de-12-caracteres-o-mas>

GEMINI_API_KEY=<opcional>
```

No configurar secretos JWT con valores de ejemplo. En `NODE_ENV=production`, el servidor rechaza el arranque si faltan secretos seguros o conexion a base de datos.

`DB_HOST=db` nunca debe usarse en Railway. Ese host solo existe cuando el backend y PostgreSQL corren juntos dentro de `docker-compose.yml` local. En Railway, `DB_HOST` debe apuntar al servicio `Postgres` mediante `${{Postgres.PGHOST}}`, o puedes usar `DATABASE_URL=${{Postgres.DATABASE_URL}}`.

## 3. Dockerfile en Railway

Railway usa el `Dockerfile` detectado automaticamente. El flujo interno es:

```bash
npm ci
npm run build
npm run start
```

El `Dockerfile` expone el puerto `3000`, pero la aplicacion escucha `process.env.PORT || 3000`, por lo que respeta el puerto dinamico de Railway. No usar `npm run start:dev` en produccion.

`docker-compose.yml`, si existe en la rama, es solo para desarrollo local. No se debe conectar el backend de Railway al host `db` de Compose.

## 4. Migraciones

Las migraciones se ejecutan contra el codigo compilado:

```bash
npm run build
npm run migration:run
```

Para desarrollo local sin compilar primero:

```bash
npm run migration:run:ts
```

En produccion `synchronize` queda desactivado con `NODE_ENV=production`; la base debe inicializarse con migraciones.

## 5. Admin inicial

Despues de ejecutar migraciones, crear o verificar el primer usuario Admin:

```bash
npm run seed:admin
```

El script lee `ADMIN_EMAIL`, `ADMIN_NOMBRE` y `ADMIN_CONTRASENA`, usa bcrypt, asegura los roles base y no contiene contrasenas hardcodeadas. Si el usuario ya existe, lo deja activo y con rol Admin. Solo actualiza la contrasena si `ADMIN_ACTUALIZAR_CONTRASENA=true`.

## 6. Pruebas de humo

Con el dominio asignado por Railway:

```bash
curl https://<backend>.up.railway.app/api/salud
curl https://<backend>.up.railway.app/api/docs
curl -X POST https://<backend>.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cambridge.example","contrasena":"<ADMIN_CONTRASENA>"}'
```

Tambien se mantiene `/api/health` como alias de compatibilidad para evidencia QA existente, y `/api/franjas-horarias` como alias de `/api/franjas` para no romper el frontend actual.
