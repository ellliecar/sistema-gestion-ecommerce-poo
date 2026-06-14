import { IProduct } from "../interfaces/IProduct";
import { IOrderProcessor } from "../interfaces/IOrderProcessor";
import { InsufficientStockError, InvalidPaymentError } from "../errors/CustomErrors";

/**
 * Servicio de orquestación de pedidos.
 * 
 * Estructuras de datos aplicadas:
 * - Map<string, IProduct>: Acceso O(1) a catálogo por ID
 * - Set<string>: Prevención de duplicados en sesión de usuario
 * - Array como Cola FIFO: Procesamiento ordenado de transacciones
 * 
 * Fundamento arquitectónico: Separación de responsabilidades,
 * manejo explícito de efectos y trazabilidad completa.
 */
export class OrderService implements IOrderProcessor {
  private catalog: Map<string, IProduct>;
  private orderQueue: string[][]; // [productId, quantity, userId]
  private processedSessionIds: Set<string>;

  constructor() {
    this.catalog = new Map();
    this.orderQueue = [];
    this.processedSessionIds = new Set();
  }

  /**
   * Registra un producto en el catálogo con validación de unicidad.
   * @param product - Instancia que implementa IProduct
   * @throws Error si ya existe un producto con el mismo ID
   */
  public addProductToCatalog(product: IProduct): void {
    if (this.catalog.has(product.getId())) {
      throw new Error(`DuplicateProductError: Ya existe ${product.getId()}`);
    }
    this.catalog.set(product.getId(), product);
  }

  /**
   * Procesamiento seguro de pedido.
   * 
   * Flujo arquitectónico:
   * 1. Validación de sesión (evita duplicados)
   * 2. Búsqueda en catálogo (Map O(1))
   * 3. Verificación de stock (sin mutación)
   * 4. Mutación controlada (reduceStock)
   * 5. Encolado para trazabilidad (FIFO)
   * 6. Manejo explícito de errores de dominio
   * 
   * @param productId - ID del producto solicitado
   * @param quantity - Cantidad requerida
   * @param userId - Identificador del usuario
   * @returns Mensaje de confirmación con estado de la cola
   * @throws InsufficientStockError | InvalidPaymentError | Error genérico
   */
  public process(productId: string, quantity: number, userId: string): string {
    const sessionId = `${productId}::${userId}`;
    
    // Prevención de duplicados mediante Set (O(1) lookup)
    if (this.processedSessionIds.has(sessionId)) {
      throw new Error("DuplicateRequestError: Solicitud ya procesada en esta sesión");
    }

    // Búsqueda eficiente en catálogo (Map O(1))
    const product = this.catalog.get(productId);
    if (!product) throw new Error("NotFoundError: Producto no existe en catálogo");

    // Validación de estado antes de mutación (principio de inmutabilidad relativa)
    if (!product.isAvailable(quantity)) {
      throw new InsufficientStockError(productId, quantity, product.getStock());
    }

    try {
      // Mutación controlada: solo vía método público de la entidad
      const success = product.reduceStock(quantity);
      if (!success) throw new InvalidPaymentError("FallbackError: Fallo en reducción de inventario");

      // Encolado FIFO para procesamiento asíncrono futuro (ej. facturación, logística)
      this.orderQueue.push([productId, String(quantity), userId]);
      this.processedSessionIds.add(sessionId);

      return `✅ Pedido registrado. Cola activa: ${this.orderQueue.length}`;
    } catch (error) {
      // Manejo selectivo: errores de dominio se propagan, otros se envuelven
      if (error instanceof InsufficientStockError) throw error;
      throw new InvalidPaymentError(`ProcessingError: ${error.message}`);
    }
  }

  /**
   * Retorna el estado actual de la cola de pedidos.
   * @returns Número de pedidos pendientes de procesamiento secundario
   */
  public getQueueStatus(): number {
    return this.orderQueue.length;
  }
}
