/**
 * Contrato para entidades de producto.
 * Garantiza acceso controlado y validación de inventario sin acoplamiento.
 * @interface IProduct
 */
export interface IProduct {
  getId(): string;
  getName(): string;
  getPrice(): number;
  getStock(): number;
  reduceStock(quantity: number): boolean;
  isAvailable(quantity: number): boolean;
}
