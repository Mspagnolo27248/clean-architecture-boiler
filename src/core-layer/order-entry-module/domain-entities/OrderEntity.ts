import { OrderDetailDTO, OrderHeaderDTO } from "../data-transfer-objects/order-entry-dtos";

export class Order {
  private header: OrderHeaderDTO;
  private details: OrderDetailDTO[] = [];

  constructor(header: OrderHeaderDTO, details: OrderDetailDTO[]) {
      this.header = header;
      this.details = details;
      this.header.totalAmount = this.calculateTotalAmount()
  }

  // Domain logic: Validate if the order is valid
  validateOrder(): void {
      if (this.details.length === 0) {
          throw new Error('Order must contain at least one order detail.');
      }

      for (const detail of this.details) {
          if (detail.quantity <= 0) {
              throw new Error('Quantity must be greater than zero for all order details.');
          }
          if (detail.unitPrice <= 0) {
              throw new Error('Unit price must be greater than zero for all order details.');
          }
      }

      if (this.header.totalAmount !== this.calculateTotalAmount()) {
          throw new Error('Total amount mismatch. Recalculate total.');
      }
  }

  // Calculate total amount from details
  calculateTotalAmount(): number {
      return this.details.reduce((sum, detail) => sum + detail.lineTotal, 0);
  }

  // Add an order detail to the order
  addDetail(detail: OrderDetailDTO): void {
      this.details.push(detail);
      this.header.totalAmount = this.calculateTotalAmount();  // Recalculate total after adding detail
  }

  // Remove an order detail by orderDetailID
  removeDetail(orderDetailID: number): void {
      this.details = this.details.filter(detail => detail.orderDetailID !== orderDetailID);
      this.header.totalAmount = this.calculateTotalAmount();  // Recalculate total after removing detail
  }

  // Get order header information
  getHeader(): OrderHeaderDTO {
      return this.header;
  }

  // Get order details
  getDetails(): OrderDetailDTO[] {
      return this.details;
  }

  // Get the total quantity of items in the order
  getTotalQuantity(): number {
      return this.details.reduce((total, detail) => total + detail.quantity, 0);
  }

  // Get total price of the order
  getTotalPrice(): number {
      return this.header.totalAmount;
  }
}
