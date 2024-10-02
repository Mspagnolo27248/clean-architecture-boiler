import { OrderHeader } from "../../../shared-common/database/custom-orm/data-models/OrderHeader";
import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { AppError } from "../domain-entities/AppError";
import { Order } from "../domain-entities/OrderEntity";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(order: Order,): Promise<Order> {
    try {     
      order.validateOrder();
      const createdOrder = await this.orderRepository.createOrder(order);
      return createdOrder;
    } catch (error) {
      throw new AppError('Error creating order', 500);
    }
  }
}
