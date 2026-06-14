# 🏗️ Arquitectura del Sistema & Justificación Técnica
**Estudiante:** Elizabeth Cardona  
**Asignatura:** Programación Orientada a Objetos  
**Institución:** Universidad Internacional del Ecuador (UIDE)  
**Proyecto:** Sistema de Gestión de E-commerce (POO)  
**Fecha:** 14 de junio de 2026

---

## 📐 Diagrama de Arquitectura General

```mermaid
graph TD
    A[Cliente/API] --> B[OrderService]
    B --> C{Validación}
    C -->|Sesión única| D[Set<string>]
    C -->|Catálogo| E[Map<string, IProduct>]
    C -->|Cola pedidos| F[Array FIFO]
    
    E --> G[Product: IProduct]
    G --> H[Encapsulamiento: private]
    G --> I[Invariantes: constructor]
    
    B --> J[Manejo de Errores]
    J --> K[InsufficientStockError]
    J --> L[InvalidPaymentError]
    
    F --> M[Procesamiento Asíncrono]
    
    style A fill:#e1f5fe
    style B fill:#fff9c4
    style G fill:#e8f5e9
    style J fill:#ffebee
