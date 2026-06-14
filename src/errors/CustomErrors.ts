/**
 * Excepciones de dominio tipadas.
 * Permiten manejo selectivo sin catch-all genéricos, mejorando trazabilidad.
 * Fundamento: Los errores de negocio deben ser explícitos y recuperables.
 */

/**
 * Error lanzado cuando se solicita más stock del disponible.
 * Incluye contexto para debugging y UI amigable.
 */
export class InsufficientStockError extends Error {
  constructor(productId: string, requested: number, available: number) {
    super(`InsufficientStockError: Producto ${productId}. Solicitado: ${requested}, Disponible: ${available}`);
    this.name = "InsufficientStockError";
  }
}

/**
 * Error lanzado cuando falla el procesamiento de pago o validación financiera.
 */
export class InvalidPaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPaymentError";
  }
}
