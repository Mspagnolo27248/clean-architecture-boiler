import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { OrderDTO } from "../data-transfer-objects/order-entry-dtos";
import { AppError } from "../domain-entities/AppError";
import { Order } from "../domain-entities/OrderEntity";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderDTO: OrderDTO): Promise<Order> {
    const { productCode, quantity, totalPrice, freightType } = orderDTO;

    try {
      // Create order entity
      const order = new Order('', productCode, quantity, totalPrice, freightType);
      order.validateOrder();

      // Save order to the repository
      const createdOrder = await this.orderRepository.createOrder(order);
      return createdOrder;
    } catch (error) {
      throw new AppError('Error creating order', 500);
    }
  }
}
