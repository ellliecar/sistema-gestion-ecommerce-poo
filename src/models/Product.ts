import { IProduct } from "../interfaces/IProduct";

/**
 * Clase Product: Implementación concreta de IProduct.
 * Encapsulamiento estricto: estado interno inaccesible desde fuera.
 * Validación de invariantes en constructor para garantizar estado consistente.
 */
export class Product implements IProduct {
  // Encapsulamiento: atributos privados, solo accesibles vía métodos públicos
  private readonly id: string;
  private name: string;
  private price: number;
  private stock: number;

  /**
   * Constructor con validación de invariantes.
   * @param id - Identificador único del producto
   * @param name - Nombre comercial
   * @param price - Precio unitario (debe ser > 0)
   * @param stock - Cantidad disponible (debe ser >= 0)
   */
  constructor(id: string, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.validateInvariants(); // Garantiza estado válido desde el nacimiento
  }

  /**
   * Validación de invariantes de dominio.
   * Lanza error si el objeto no cumple reglas de negocio básicas.
   * @private
   */
  private validateInvariants(): void {
    if (this.price <= 0) throw new Error("Invariant violation: El precio debe ser > 0");
    if (this.stock < 0) throw new Error("Invariant violation: El stock no puede ser negativo");
  }

  // Getters: único punto de acceso al estado interno (encapsulamiento)
  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getPrice(): number { return this.price; }
  public getStock(): number { return this.stock; }

  /**
   * Reduce stock de forma segura.
   * Retorna booleano para evitar mutaciones silenciosas.
   * @param quantity - Cantidad a descontar
   * @returns true si la operación fue exitosa, false si no hay stock suficiente
   */
  public reduceStock(quantity: number): boolean {
    if (!this.isAvailable(quantity)) return false;
    this.stock -= quantity;
    return true;
  }

  /**
   * Verifica disponibilidad sin mutar estado.
   * @param quantity - Cantidad solicitada
   * @returns true si hay stock suficiente
   */
  public isAvailable(quantity: number): boolean {
    return this.stock >= quantity;
  }
}
