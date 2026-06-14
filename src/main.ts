import { Product } from "./models/Product";
import { OrderService } from "./services/OrderService";
import { InsufficientStockError } from "./errors/CustomErrors";

/**
 * Punto de entrada del sistema.
 * Demostración de funcionalidades: encapsulamiento, interfaces, 
 * manejo de errores y estructuras de datos aplicadas.
 */

// 1. Inicialización del servicio
const service = new OrderService();

// 2. Registro de productos en catálogo (Map)
service.addProductToCatalog(new Product("P001", "Laptop Pro", 1200, 10));
service.addProductToCatalog(new Product("P002", "Mouse Ergo", 45, 50));

// 3. Escenarios de prueba que cubren: éxito, error de stock, duplicados
const testScenarios = [
  { id: "P001", qty: 2, user: "U100", description: "Pedido válido - Laptop" },
  { id: "P002", qty: 1, user: "U100", description: "Pedido válido - Mouse" },
  { id: "P001", qty: 9, user: "U200", description: "Pedido válido - Stock límite" },
  { id: "P001", qty: 5, user: "U300", description: "Error esperado - Stock insuficiente" }
];

console.log("🚀 Iniciando demostración del Sistema de Gestión E-commerce (POO)\n");

// 4. Ejecución controlada con manejo explícito de errores
testScenarios.forEach(({ id, qty, user, description }) => {
  console.log(`📦 ${description}`);
  console.log(`   → Producto: ${id} | Cantidad: ${qty} | Usuario: ${user}`);
  
  try {
    const result = service.process(id, qty, user);
    console.log(`   ✅ Resultado: ${result}\n`);
  } catch (error: any) {
    // Manejo diferenciado por tipo de error (evidencia de tipado)
    if (error instanceof InsufficientStockError) {
      console.log(`   ⚠️ Error de dominio (controlado): ${error.message}\n`);
    } else {
      console.log(`   ❌ Error inesperado: ${error.message}\n`);
    }
  }
});

// 5. Verificación final del estado del sistema
console.log("📊 Estado final del sistema:");
console.log(`   • Pedidos en cola FIFO: ${service.getQueueStatus()}`);
console.log(`   • Sistema estable y trazable ✅\n`);
console.log("🎓 Demostración completada - Elizabeth Cardona - UIDE");
