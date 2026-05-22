# Sistema CAL — Backend API

> **Cambridge Academy of Languages** — Plataforma de gestión académica para ~1 000 estudiantes y 40+ docentes en Colombia.

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura de módulos](#arquitectura-de-módulos)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Variables de entorno](#variables-de-entorno)
- [Endpoints principales](#endpoints-principales)
- [Seguridad](#seguridad)
- [Motor de horarios con IA](#motor-de-horarios-con-ia)
- [Pipeline KDD](#pipeline-kdd)
- [Migraciones](#migraciones)
- [Tests](#tests)
- [Docker](#docker)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Descripción general

API REST construida con **NestJS 10 + TypeORM + PostgreSQL 16**. Cubre ocho fases de desarrollo:

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Bootstrap: estructura NestJS, Docker, healthcheck | ✅ |
| 1 | Seguridad: JWT dual-token, RBAC por roles, audit log | ✅ |
| 2 | Datos maestros: períodos, docentes, estudiantes, aulas, grupos, cursos, franjas, disponibilidades | ✅ |
| 3 | Motor IA: algoritmo genético + búsqueda tabú para generación de horarios | ✅ |
| 4 | Integración Google Gemini 2.5 Flash (sugerencia automática de parámetros) | ✅ |
| 5 | Módulo de evaluación docente: formularios, dimensiones, preguntas, evaluaciones, respuestas | ✅ |
| 6 | Pipeline KDD (Fayyad 1996): análisis, alertas automáticas, dashboard estadístico | ✅ |
| 8 | Hardening: helmet, rate limiting configurable, logger JSON con eliminación de PII | ✅ |

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | NestJS 10 |
| Lenguaje | TypeScript 5 |
| ORM | TypeORM 0.3 |
| Base de datos | PostgreSQL 16 |
| Autenticación | JWT (access token 15 min + refresh token 7 días) |
| Validación | class-validator / class-transformer |
| Documentación | Swagger / OpenAPI 3 |
| IA generativa | Google Gemini 2.5 Flash |
| Seguridad HTTP | helmet, @nestjs/throttler |
| Contenedor | Docker + Docker Compose |

---

## Arquitectura de módulos

```
src/
├── main.ts                        # Bootstrap: helmet, logger JSON, Swagger, CORS
├── app.modulo.ts                  # Módulo raíz: TypeORM, ThrottlerModule, módulos
│
├── core/
│   ├── salud/                     # GET /api/salud — healthcheck
│   └── logger/                    # LoggerJson — salida JSON estructurada sin PII
│
├── compartido/
│   ├── periodos/                  # CRUD períodos académicos
│   ├── docentes/                  # CRUD docentes
│   └── estudiantes/               # CRUD estudiantes
│
├── seguridad/
│   ├── auth/                      # Login, refresh token, guards JWT/Roles
│   ├── usuarios/                  # CRUD usuarios con roles
│   └── audit-log/                 # Registro automático de acciones
│
├── modulo-horarios/
│   ├── aulas/                     # CRUD aulas
│   ├── niveles/                   # CRUD niveles de idioma (A1-C1)
│   ├── cursos/                    # CRUD cursos
│   ├── grupos/                    # CRUD grupos
│   ├── franjas/                   # CRUD franjas horarias
│   ├── disponibilidades/          # CRUD disponibilidades de docentes
│   ├── horarios/                  # Generación y consulta de horarios
│   └── motor/                     # Algoritmo genético + tabú + Gemini
│
└── modulo-evaluacion/
    ├── formularios/               # CRUD formularios de evaluación
    ├── dimensiones/               # CRUD dimensiones con peso ponderado
    ├── preguntas/                 # CRUD preguntas (escala/abierta/opción múltiple)
    ├── evaluaciones/              # CRUD evaluaciones por docente
    ├── respuestas/                # CRUD respuestas individuales
    ├── kdd/                       # Pipeline KDD: ejecución + resultados
    ├── alertas/                   # Gestión de alertas automáticas
    └── dashboard/                 # Resumen estadístico por período
```

---

## Requisitos previos

- Node.js >= 20
- npm >= 10
- PostgreSQL 16 (o Docker)

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Proyecto-grado-ucc/proyectoGrado-server.git
cd proyectoGrado-server

# 2. Instalar dependencias
npm install

# 3. Copiar y ajustar variables de entorno
cp .env.example .env
# Editar .env con los valores del entorno local

# 4. Levantar servicios locales con Docker, si aplica
docker compose up -d

# 5. Iniciar el servidor en modo desarrollo
npm run start:dev
```

| Recurso | URL |
|---------|-----|
| API REST | `http://<host-local>:3000/api` |
| Documentación Swagger | `http://<host-local>:3000/api/docs` |
| Healthcheck | `http://<host-local>:3000/api/salud` |

---

## Variables de entorno

Copiar `.env.example` como `.env` y completar los valores:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3000` |
| `DATABASE_URL` | URL completa de PostgreSQL. Tiene prioridad si esta definida | *(opcional)* |
| `PGHOST` | Host de PostgreSQL en Railway | *(opcional)* |
| `PGPORT` | Puerto de PostgreSQL en Railway | `5432` |
| `PGUSER` | Usuario de PostgreSQL en Railway | *(opcional)* |
| `PGPASSWORD` | Contraseña de PostgreSQL en Railway | *(opcional)* |
| `PGDATABASE` | Nombre de la base de datos en Railway | *(opcional)* |
| `DB_HOST` | Host de PostgreSQL para compatibilidad local | *(sin valor por defecto)* |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USUARIO` | Usuario de la base de datos | `cal_usuario` |
| `DB_CONTRASENA` | Contraseña de la base de datos | `cal_contrasena` |
| `DB_NOMBRE` | Nombre de la base de datos | `cal_database` |
| `JWT_SECRETO` | Secreto para tokens de acceso | *(requerido)* |
| `JWT_EXPIRACION` | Duración del access token | `15m` |
| `JWT_REFRESCO_SECRETO` | Secreto para tokens de refresco | *(requerido)* |
| `JWT_REFRESCO_EXPIRACION` | Duración del refresh token | `7d` |
| `GEMINI_API_KEY` | Clave API de Google Gemini *(opcional)* | — |
| `CORS_ORIGINS` | Orígenes permitidos, separados por coma | *(requerido en produccion para frontend web)* |
| `THROTTLE_TTL` | Ventana de rate limiting en ms | `60000` |
| `THROTTLE_LIMIT` | Máximo de peticiones por ventana | `100` |

> Si `GEMINI_API_KEY` no está definida, el motor usa parámetros por defecto en lugar de la sugerencia de Gemini.

---

## Endpoints principales

Todos llevan el prefijo `/api`. Documentación interactiva completa en `/api/docs`.

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login: devuelve access + refresh token |
| POST | `/api/auth/refresh` | Renovar access token con refresh token |
| POST | `/api/auth/logout` | Invalidar sesión activa |

### Datos maestros (todos requieren rol Admin)

| Recurso | Ruta base | Operaciones |
|---------|-----------|-------------|
| Períodos | `/api/periodos` | GET, POST, PATCH `:id`, DELETE `:id` |
| Docentes | `/api/docentes` | GET, POST, PATCH `:id`, DELETE `:id` |
| Estudiantes | `/api/estudiantes` | GET, POST, PATCH `:id`, DELETE `:id` |
| Aulas | `/api/aulas` | GET, POST, PATCH `:id`, DELETE `:id` |
| Niveles | `/api/niveles` | GET, POST, PATCH `:id`, DELETE `:id` |
| Cursos | `/api/cursos` | GET, POST, PATCH `:id`, DELETE `:id` |
| Grupos | `/api/grupos` | GET, POST, PATCH `:id`, DELETE `:id` |
| Franjas | `/api/franjas` | GET, POST, PATCH `:id`, DELETE `:id` |
| Disponibilidades | `/api/disponibilidades` | GET, POST, PATCH `:id`, DELETE `:id` |

### Motor de horarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/horarios/generar` | Generar horario óptimo para un período |
| GET | `/api/horarios` | Listar horarios generados (paginado) |
| GET | `/api/horarios/:id` | Obtener horario por ID |
| DELETE | `/api/horarios/:id` | Eliminar horario |

### Evaluación docente

| Método | Ruta | Descripción |
|--------|------|-------------|
| CRUD | `/api/formularios` | Gestión de formularios de evaluación |
| CRUD | `/api/dimensiones` | Dimensiones con peso ponderado |
| CRUD | `/api/preguntas` | Preguntas por dimensión |
| CRUD | `/api/evaluaciones` | Evaluaciones asignadas a docentes |
| CRUD | `/api/respuestas` | Respuestas individuales |

### KDD, Alertas y Dashboard

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/kdd/ejecutar` | Ejecutar pipeline KDD para un período |
| GET | `/api/kdd/resultados?periodoId=X` | Resultados KDD del período |
| GET | `/api/alertas?periodoId=X` | Listar alertas (filtro opcional) |
| PATCH | `/api/alertas/:id/leer` | Marcar alerta como leída |
| DELETE | `/api/alertas/:id` | Eliminar alerta |
| GET | `/api/dashboard/resumen?periodoId=X` | Resumen estadístico del período |

---

## Seguridad

### Autenticación JWT dual-token

```
POST /api/auth/login
  → access_token  (15 min)   usar en: Authorization: Bearer <token>
  → refresh_token (7 dias)   usar en: POST /api/auth/refresh
```

Cada token lleva el claim `tipo: 'acceso' | 'refresco'` para impedir uso cruzado.

### RBAC (Control de acceso basado en roles)

| Rol | Acceso |
|-----|--------|
| `Admin` | CRUD completo en todos los módulos |
| `Docente` | Consulta de horarios, envío de evaluaciones |
| `Estudiante` | Consulta de grupos y evaluaciones propias |

### Rate limiting

100 peticiones por IP por minuto (configurable vía `THROTTLE_TTL` y `THROTTLE_LIMIT`). El guard aplica globalmente a todos los endpoints.

### Cabeceras de seguridad HTTP

`helmet` configura automáticamente: `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`, entre otras.

### Logger JSON con eliminación de PII

El `LoggerJson` reemplaza con `[REDACTED]` los campos `email`, `passwordHash`, `password`, `token` y `evaluadorId` en todos los registros de log.

### Audit log

El decorador `@Auditar('ENTIDAD')` registra automáticamente en la tabla `audit_log`: usuario, método HTTP, entidad afectada, IP y timestamp en cada escritura.

---

## Motor de horarios con IA

El motor combina un **algoritmo genético** con **búsqueda tabú**, opcionalmente asistido por **Google Gemini 2.5 Flash**:

```
POST /api/horarios/generar { periodoId }
         |
         v
  GeminiServicio.sugerirConfiguracion(entrada)
  Si GEMINI_API_KEY esta definida:
    Gemini analiza la carga y sugiere parametros optimos
    { tamPoblacion, generaciones, tasaMutacion, tasaCruce, ... }
  Si no: usa CONFIG_DEFAULT
         |
         v
  AlgoritmoGenetico.evolucionar()
  · Seleccion por torneo
  · Cruce monopunto entre cromosomas
  · Mutacion aleatoria de genes
  · Elitismo (el mejor cromosoma siempre sobrevive)
         |
         v
  BusquedaTabu.refinar(mejorCromosoma)
  · Lista tabu de tamano configurable
  · Vecindad: swap de docente / aula / franja en un gen
         |
         v
  Horario guardado en BD
  { asignaciones: JSONB, fitness, generaciones, tiempo_ms }
```

**Funcion de fitness** — penalizaciones por conflicto:

| Tipo de conflicto | Penalizacion |
|-------------------|-------------|
| Docente o aula asignados dos veces en la misma franja | -100 |
| Docente marcado como no disponible en esa franja | -50 |
| Capacidad del aula superada por el cupo del grupo | -30 |
| Docente supera su carga maxima de horas semanales | -20 por hora extra |

---

## Pipeline KDD

Implementa el proceso KDD de Fayyad et al. (1996) en cinco etapas sobre las evaluaciones docentes:

```
Etapa 1 — SELECCION
  Evaluaciones con estado COMPLETADA para el periodoId dado

Etapa 2 — PREPROCESAMIENTO
  Filtrar respuestas numericas validas (valor_numerico IS NOT NULL)

Etapa 3 — TRANSFORMACION
  Por cada evaluacion: promedio de valores por dimension
  Ponderado por dimension.peso

Etapa 4 — MINERIA
  Agregar por docente: puntuacion global ponderada
  Guardar en resultado_kdd

Etapa 5 — INTERPRETACION
  Generar alertas automaticas:
    puntuacion < 3.0  → BAJO_RENDIMIENTO / CRITICO
    puntuacion < 3.5  → BAJO_RENDIMIENTO / ADVERTENCIA
    sin evaluaciones  → SIN_EVALUACIONES / INFO
```

Los resultados se persisten en `resultado_kdd` y las alertas en `alerta`. Cada ejecucion del pipeline reemplaza los datos del mismo periodo.

---

## Migraciones

| Migracion | Tablas creadas |
|-----------|---------------|
| `1700000000000-seguridad-inicial` | `rol`, `usuario`, `sesion`, `audit_log` |
| `1700000000001-datos-maestros` | `periodo_academico`, `docente`, `estudiante`, `aula`, `nivel_idioma`, `curso`, `grupo`, `franja_horaria`, `disponibilidad` |
| `1700000000002-motor-evaluacion` | `horario`, `formulario`, `dimension`, `pregunta`, `evaluacion`, `respuesta` |
| `1700000000003-kdd-alertas` | `resultado_kdd`, `alerta` |

En `NODE_ENV !== 'production'`, TypeORM sincroniza el esquema automaticamente.
En produccion ejecutar:

```bash
npm run migration:run
```

---

## Tests

```bash
# Tests unitarios
npm run test

# Con reporte de cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

Los specs unitarios cubren todos los servicios con mocks de repositorios TypeORM:
- Compartido: `DocentesServicio`, `EstudiantesServicio`, `PeriodosServicio`
- Horarios: `AulasServicio`, `NivelesServicio`, `CursosServicio`, `GruposServicio`, `FranjasServicio`, `DisponibilidadesServicio`, `HorariosServicio`
- Evaluacion: `FormulariosServicio`, `DimensionesServicio`, `PreguntasServicio`, `EvaluacionesServicio`, `RespuestasServicio`
- KDD: `KddPipelineServicio`, `AlertasServicio`, `DashboardServicio`

---

## Docker

```bash
# Levantar todo (base de datos + backend)
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f backend

# Detener y limpiar volumenes
docker compose down -v
```

El `Dockerfile` usa multi-stage build:
- **builder**: `node:20-alpine` — instala dependencias y compila TypeScript
- **runner**: `node:20-alpine` — solo `dist/` y `node_modules` de produccion

---

## Estructura del proyecto

```
.
├── src/
│   ├── main.ts
│   ├── app.modulo.ts
│   ├── core/
│   │   ├── salud/
│   │   └── logger/logger-json.ts
│   ├── compartido/
│   │   ├── entidades/
│   │   ├── periodos/
│   │   ├── docentes/
│   │   └── estudiantes/
│   ├── seguridad/
│   │   ├── auth/
│   │   ├── entidades/
│   │   ├── usuarios/
│   │   └── audit-log/
│   ├── modulo-horarios/
│   │   ├── entidades/
│   │   ├── motor/
│   │   ├── aulas/  cursos/  grupos/
│   │   ├── niveles/  franjas/  disponibilidades/
│   │   └── horarios/
│   ├── modulo-evaluacion/
│   │   ├── entidades/
│   │   ├── formularios/  dimensiones/  preguntas/
│   │   ├── evaluaciones/  respuestas/
│   │   ├── kdd/
│   │   ├── alertas/
│   │   └── dashboard/
│   └── migraciones/
├── test/
├── Dockerfile
├── docker-compose.yml
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## Licencia

Proyecto de grado — Universidad Cooperativa de Colombia · Facultad de Ingenieria · 2026
