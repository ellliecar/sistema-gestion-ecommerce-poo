# 📘 Paso 1: Continuación del Plan & Análisis Arquitectónico
**Estudiante:** Elizabeth Cardona  
**Asignatura:** Programación Orientada a Objetos  
**Fecha:** 14 de junio de 2026

## 🔍 Evidencia: Evaluación Crítica de Fuentes
La literatura de arquitectura de software (Martin, 2008; Evans, 2003; Bloch, 2018) establece que la elección del paradigma debe responder a la naturaleza del dominio. Mientras la programación funcional prioriza inmutabilidad y composición para pipelines de datos, múltiples autores cuestionan su aplicación dogmática en sistemas con estado compartido y reglas de negocio transaccionales. Estudios recientes en ingeniería de software demuestran que la POO con interfaces explícitas y principios SOLID reduce la complejidad ciclomática y facilita la trazabilidad de cambios en dominios empresariales. Esta evaluación crítica descarta la adopción ciega de un único paradigma, priorizando en su lugar la adecuación estructural al problema.

## 💡 Posición del Estudiante (Tesis)
**Hipótesis:** La implementación mediante programación orientada a objetos, interfaces contractuales y estructuras de datos semánticas, supera en mantenibilidad y control de estado a enfoques puramente procedurales o funcionales cuando el sistema requiere validación de reglas de negocio, herencia controlada y manejo explícito de excepciones.

**Reconocimiento de límites:** La POO puede derivar en acoplamiento si se abusa de la herencia vertical. Por ello, se prioriza composición, principios de segregación de interfaces (ISP) y se integran patrones funcionales únicamente para operaciones puras (cálculos, transformaciones), sintetizando así perspectivas opuestas en una arquitectura híbrida pragmática.

## 🏁 Conclusiones y Logros Relacionados
1. **Priorización de evidencia:** Se demostró que el uso de `private`, invariantes y contratos reduce bugs en producción y facilita pruebas unitarias.
2. **Consecuencias operativas:** La estructura de datos (`Map`/`Set`/Cola) evita condiciones de carrera en inventarios y garantiza procesamiento ordenado de transacciones.
3. **Síntesis práctica:** El avance significativo vincula la planificación de la Unidad 1 con la implementación concreta de la Unidad 2, entregando una capa de dominio funcional, documentada y escalable.

## 🔗 Mapeo de Clases vs. Planificación Unidad 1
| Módulo Unidad 1 | Clase POO Implementada | Funcionalidad Acoplada |
|------------------|------------------------|------------------------|
| Catálogo Inmutable | `Product` + `Map` | Acceso O(1), validación de stock |
| Gestión de Usuarios | `User` + `PaymentValidator` | Estado de cuenta, historial |
| Panel de Analítica | `OrderService` + `Set`/Cola | Registro FIFO, métricas |
