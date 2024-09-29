import { Order } from "../domain-entities/OrderEntity";

export interface OrderRepository {
  createOrder(order: Order): Promise<Order>;

}
