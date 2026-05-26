# Criterios de legibilidad aplicados a los diagramas

Los diagramas fueron ajustados siguiendo buenas practicas de documentacion arquitectonica y modelado visual:

- Separar niveles de abstraccion: C4 Context para actores y sistemas externos; C4 Container para componentes desplegables.
- Usar etiquetas cortas dentro de los nodos. La explicacion extensa queda en el texto del capitulo, no en la caja del diagrama.
- Mantener un unico proposito por figura: contexto, contenedores, flujo, secuencia, entidad-relacion, clases, estados o despliegue.
- Reducir cruces visuales mediante orientacion consistente (`TD` para procesos secuenciales y `LR` para arquitectura/componentes).
- Evitar saturacion de atributos en ERD y clases. Solo se muestran claves y atributos representativos; el detalle completo pertenece al diccionario de datos o al codigo fuente.
- Usar nombres consistentes con la implementacion: `Usuario`, `Docente`, `Estudiante`, `Formulario`, `Evaluacion`, `Horario`, `ResultadoKdd` y `Alerta`.
- Separar responsabilidades en flujos mixtos mediante swimlanes o subgrafos por actor cuando intervienen administrador, estudiante y backend.
- Diferenciar sistemas propios, servicios externos e infraestructura. El despliegue usa un boundary explicito de `AWS Cloud`; SendGrid y Gemini quedan fuera como servicios externos.
- Mantener el ERD como modelo logico normalizado para sustentacion: `HORARIO_DETALLE`, `ESTUDIANTE_GRUPO`, `DISPONIBILIDAD.periodo_id` y `RESPUESTA.estudiante_id` explicitan relaciones que no deben depender de campos JSON o asociaciones ambiguas.
- Exportar cada diagrama a SVG para conservar nitidez al insertarlo en Word o PDF.

Referencias conceptuales:

- Modelo C4: diagramas de Contexto y Contenedores para comunicar arquitectura por niveles.
- UML: diagramas de clases, casos de uso, secuencia y estados para vistas estructurales y de comportamiento.
- ISO/IEC/IEEE 42010: separacion de vistas arquitectonicas segun preocupaciones de los interesados.
