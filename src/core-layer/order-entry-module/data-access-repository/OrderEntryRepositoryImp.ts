import { initializeDb } from "../../../shared-common/database/sqlite";
import { Order } from "../domain-entities/OrderEntity";
import { OrderRepository } from "./OrderEntryRepository";

export class OrderRepositoryImpl implements OrderRepository {
    async createOrder(order: Order): Promise<Order> {
      const db = await initializeDb();
      let createdOrder: Order;  
      try {      
        const statement = await db.run(
          `INSERT INTO orders (productCode, quantity, totalPrice, freightType) 
           VALUES (?, ?, ?, ?)`,
          [order.productCode, order.quantity, order.totalPrice, order.freightType]
        );         
        if (statement && statement.lastID !== undefined) {
          createdOrder = new Order(
            statement.lastID.toString(),
            order.productCode,
            order.quantity,
            order.totalPrice,
            order.freightType
          );
        } else {
          throw new Error("Failed to create the order. Last ID is undefined.");
        }  
      } catch (error) {       
        throw new Error(`Error creating order`);
      } finally {      
        await db.close();
      } 
      return createdOrder;
    }
  }
  