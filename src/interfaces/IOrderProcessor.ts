/**
 * Interfaz para procesadores de pedidos.
 * Aplica ISP: solo expone lo necesario para validar y encolar transacciones.
 * @interface IOrderProcessor
 */
export interface IOrderProcessor {
  process(productId: string, quantity: number, userId: string): string;
  getQueueStatus(): number;
}
