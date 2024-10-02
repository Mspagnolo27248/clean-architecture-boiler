import { OrderDetailDTO, OrderDTO, OrderHeaderDTO } from "../data-transfer-objects/order-entry-dtos";

export class Order {
  private orderDTO: OrderDTO;


  constructor(orderDTO:OrderDTO) {
      this.orderDTO = orderDTO;
      this.orderDTO.totalAmount = this.calculateTotalAmount()
  }

  // Domain logic: Validate if the order is valid
  validateOrder(): void {
      if (this.orderDTO.details.length === 0) {
          throw new Error('Order must contain at least one order detail.');
      }

      for (const detail of this.orderDTO.details) {
          if (detail.quantity <= 0) {
              throw new Error('Quantity must be greater than zero for all order details.');
          }
          if (detail.unitPrice <= 0) {
              throw new Error('Unit price must be greater than zero for all order details.');
          }
      }

      if (this.orderDTO.totalAmount !== this.calculateTotalAmount()) {
          throw new Error('Total amount mismatch. Recalculate total.');
      }
  }

  // Calculate total amount from details
  calculateTotalAmount(): number {
      return this.orderDTO.details.reduce((sum, detail) => sum + detail.lineTotal, 0);
  }

  // Add an order detail to the order
  addDetail(detail: OrderDetailDTO): void {
      this.orderDTO.details.push(detail);
      this.orderDTO.totalAmount = this.calculateTotalAmount();  // Recalculate total after adding detail
  }

  // Remove an order detail by orderDetailID
  removeDetail(orderDetailID: number): void {
      this.orderDTO.details = this.orderDTO.details.filter(detail => detail.orderDetailID !== orderDetailID);
      this.orderDTO.totalAmount = this.calculateTotalAmount();  // Recalculate total after removing detail
  }

  // Get order header information
  getHeader(): OrderHeaderDTO {
    const headers:Partial<OrderDTO>= {...this.orderDTO};
     delete headers.details
      return  headers as OrderHeaderDTO;
  }

  // Get order details
  getDetails(): OrderDetailDTO[] {
      return this.orderDTO.details;
  }

  // Get the total quantity of items in the order
  getTotalQuantity(): number {
      return this.orderDTO.details.reduce((total, detail) => total + detail.quantity, 0);
  }

  // Get total price of the order
  getTotalPrice(): number {
      return this.orderDTO.totalAmount;
  }
}
