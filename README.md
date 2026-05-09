# ⚙️ Cambridge Academy of Languages — Sistema de Gestión (Backend)

Repositorio del **servidor API** del sistema de gestión académica CAL. Construido con NestJS + TypeORM + PostgreSQL.

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| NestJS | 10 | Framework principal |
| TypeScript | 5.3 | Tipado estático |
| TypeORM | 0.3 | ORM para PostgreSQL |
| PostgreSQL | 15 | Base de datos relacional |
| JWT + Passport | — | Autenticación y autorización |
| Swagger | 7 | Documentación de la API |
| Gemini AI | — | Motor de optimización de horarios |
| Nodemailer | 8 | Envío de correos (recuperación de contraseña) |
| Docker | — | Contenedor de base de datos |

## 📦 Estructura del Proyecto

```
src/
├── compartido/              # Entidades compartidas (Docente, Estudiante)
├── modulo-evaluacion/       # Evaluaciones, formularios, KDD, alertas, dashboard
│   ├── evaluaciones/
│   ├── formularios/
│   ├── dimensiones/
│   ├── preguntas/
│   ├── respuestas/
│   ├── kdd/                 # Pipeline de minería de datos KDD
│   └── alertas/
├── modulo-horarios/         # Generación de horarios con IA
│   ├── horarios/
│   ├── aulas/
│   ├── cursos/
│   ├── grupos/
│   ├── franjas/
│   ├── niveles/
│   ├── disponibilidades/
│   └── motor/               # Algoritmo Genético + Búsqueda Tabú + Gemini
└── seguridad/               # Auth JWT, roles, usuarios, audit log
    ├── auth/
    └── usuarios/
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 20+
- Docker Desktop (para la base de datos)

### Pasos

```bash
# 1. Clonar el repositorio
git clone -b client https://github.com/Proyecto-grado-ucc/proyectoGrado-server.git
cd proyectoGrado-server

# 2. Instalar dependencias
npm install

# 3. Crear archivo de variables de entorno
cp .env.example .env
# (editar .env con tus credenciales)

# 4. Levantar la base de datos con Docker
docker start <nombre-contenedor-postgres>

# 5. Levantar el servidor en modo desarrollo
npm run start:dev
```

El API estará disponible en **http://localhost:3000/api**  
La documentación Swagger en **http://localhost:3000/api/docs**

### Scripts disponibles

```bash
npm run start:dev   # Servidor de desarrollo con hot-reload
npm run build       # Compilar TypeScript a JavaScript
npm run start       # Ejecutar build de producción
npm run test        # Ejecutar tests unitarios con Jest
npm run test:e2e    # Tests end-to-end
npm run lint        # Revisar errores ESLint
```

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NOMBRE=cal_db
DB_USUARIO=cal_usuario
DB_CONTRASENA=cal_contrasena

# Aplicación
NODE_ENV=development
PORT=3000

# JWT
JWT_SECRETO=tu_secreto_largo_aqui
JWT_EXPIRACION=8h
JWT_EXPIRACION_REFRESH=7d

# CORS
CORS_ORIGINS=http://localhost:5173

# Throttle
THROTTLE_TTL=60000
THROTTLE_LIMIT=100

# Google Gemini AI
GEMINI_API_KEY=tu_api_key_aqui

# Correo SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_app_password
APP_URL=http://localhost:5173
```

## 🤖 Motor de Generación de Horarios

El sistema utiliza un motor híbrido de IA para generar horarios óptimos:

1. **Algoritmo Genético** — genera población inicial de soluciones
2. **Búsqueda Tabú** — refina la mejor solución encontrada
3. **Gemini AI** — validación semántica y ajuste final

Soporta **restricciones duras** (conflictos de aula/docente/franja) y **restricciones voluntarias** (exclusión de tipos de aula: salón, laboratorio, virtual).

## 📊 Módulo KDD

Pipeline de minería de datos que procesa las evaluaciones docentes por período:
- Calcula puntuaciones globales y por dimensión
- Genera alertas automáticas según umbrales configurados
- Almacena resultados históricos comparables entre períodos

## 🔗 Repositorio Frontend

El cliente web del sistema se encuentra en: [proyectoGrado-client](https://github.com/Proyecto-grado-ucc/proyectoGrado-client)
