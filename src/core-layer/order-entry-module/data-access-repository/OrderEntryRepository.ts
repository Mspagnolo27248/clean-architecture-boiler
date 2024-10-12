import { OrderDTO } from "../data-transfer-objects/order-entry-dtos";
import { Order } from "../domain-entities/OrderEntity";

export interface OrderRepository {
  createOrder(order: Order): Promise<Order>;
  
  getAllOrders(): Promise<OrderDTO[]>;

  getOneOrder(orderId: string): Promise<OrderDTO | null>;

  getOneUOMAndGallonFactor(productId: string, containerId: string, uom: string): Promise<{
    unitsOfMeasureInAContainer: number,
    gallonsInAContainer: number
  }>;

  getManyUOMAndGallonFactor(keys: { productId: string, containerId: string, uoms: string }[]): Promise<
  {[key:string]:{
    unitsOfMeasureInAContainer: number,
    gallonsInAContainer: number
  }}>


}


export type UOMAndGallonFactorCompositeKeyType = {
  productId: string, containerId: string, uom: string
}