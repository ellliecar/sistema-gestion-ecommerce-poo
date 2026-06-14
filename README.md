# 🛒 Sistema de Gestión de E-commerce (POO)
> Implementación académica de un sistema de gestión empresarial basado en Programación Orientada a Objetos, interfaces contractuales y estructuras de datos semánticas.

**Estudiante:** Elizabeth Cardona  
**Asignatura:** Programación Orientada a Objetos  
**Institución:** Universidad Internacional del Ecuador (UIDE)  
**Fecha:** 14 de junio de 2026

## 🎯 Objetivo
Desarrollar una capa de dominio robusta para un e-commerce, aplicando principios de encapsulamiento, contratos explícitos (`interfaces`), manejo tipado de errores y estructuras de datos (`Map`, `Set`, Cola FIFO) para garantizar trazabilidad, cohesión y mantenibilidad.

## 🧱 Arquitectura & Paradigma
- **POO Estricta:** Encapsulamiento con `private`, invariantes en constructores, mutación controlada.
- **Interfaces:** `IProduct`, `IOrderProcessor` para desacoplamiento y testabilidad.
- **Manejo de Errores:** Excepciones de dominio tipadas (`InsufficientStockError`, `InvalidPaymentError`).
- **Estructuras de Datos:** `Map` (catálogo O(1)), `Set` (unicidad de sesión), `Array` (cola FIFO de pedidos).
- **Continuidad Unidad 1:** Integración de planificación ágil documentada en `docs/`.

## 🚀 Cómo Ejecutar
```bash
# 1. Clonar
git clone https://github.com/ellliecar/sistema-gestion-ecommerce-poo/blob/main/tsconfig.json
cd sistema-gestion-ecommerce-poo

# 2. Instalar dependencias
npm install

# 3. Compilar y ejecutar
npm run build
npm start
