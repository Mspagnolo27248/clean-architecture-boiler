import { FreightType } from "../enums/order-entry-enums";


export class Order {
  constructor(
    public id: string,
    public productCode: string,
    public quantity: number,
    public totalPrice: number,
    public freightType: FreightType
  ) {}

  // Domain logic
  validateOrder(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (this.totalPrice <= 0) {
      throw new Error('Total price must be greater than zero');
    }
  }
}
