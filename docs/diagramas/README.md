# Diagramas del Sistema CAL

Este directorio contiene los diecisiete diagramas Mermaid referenciados en el Capitulo 6 y en el Anexo B del documento de tesis.

| Figura | Archivo | Tipo | Proposito |
| --- | --- | --- | --- |
| 6.1 | `01_c4_contexto_sistema.mmd` | C4 Context | Contexto de actores externos y sistemas integrados. |
| 6.2 | `02_c4_contenedores.mmd` | C4 Container | Contenedores desplegables y responsabilidades tecnicas. |
| 6.3 | `03_flujo_autenticacion_jwt.mmd` | Flowchart | Flujo funcional de login, refresh token y autorizacion. |
| 6.4 | `04_secuencia_autenticacion_jwt.mmd` | Sequence | Interaccion dinamica del login con JWT y roles. |
| 6.5 | `05_motor_ia_genetico_tabu.mmd` | Flowchart | Arquitectura interna del motor IA hibrido. |
| 6.6 | `06_flujo_generacion_horario.mmd` | Flowchart | Proceso de generacion automatica de horarios. |
| 6.7 | `07_secuencia_generacion_horario.mmd` | Sequence | Secuencia entre administrador, API, motor IA y servicios externos. |
| 6.8 | `08_flujo_evaluacion_docente.mmd` | Flowchart | Ciclo funcional de formularios, asignaciones y respuestas. |
| 6.9 | `09_secuencia_pipeline_kdd.mmd` | Sequence | Ejecucion del pipeline KDD y generacion de alertas. |
| 6.10 | `10_erd_consolidado.mmd` | ERD | Modelo entidad-relacion consolidado. |
| 6.11 | `11_clases_dominio.mmd` | Class | Modelo de clases del dominio principal. |
| 6.12 | `12_casos_uso.mmd` | Flowchart/UML-like | Casos de uso por rol del sistema. |
| 6.13 | `13_componentes_frontend.mmd` | Flowchart | Organizacion modular del frontend React. |
| 6.14 | `14_despliegue_aws.mmd` | Flowchart | Topologia de despliegue productivo en AWS. |
| 6.15 | `15_estado_evaluacion_docente.mmd` | State | Ciclo de vida de una evaluacion docente. |
| 6.16 | `16_estado_horario.mmd` | State | Ciclo de vida del horario generado. |
| 6.17 | `17_flujo_inscripcion_estudiante_grupo.mmd` | Flowchart | Inscripcion del estudiante a grupo mediante codigo de acceso. |

Fuente: elaboracion propia, con base en la implementacion de `proyectoGrado-server` y `proyectoGrado-client`.
