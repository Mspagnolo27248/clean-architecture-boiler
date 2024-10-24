import { OrderHeaderModel } from "../../../shared-common/database/custom-orm/data-models/OrderHeaderModel";
import { initializeDb } from "../../../shared-common/database/sqlite";
import { mapInstance } from "../../../shared-common/services/helper-functions/object-mainpulation";
import {
  OrderDTO,
  OrderDetailDTO,
  OrderHeaderDTO,
} from "../data-transfer-objects/order-entry-dtos";
import { Order } from "../domain-entities/OrderEntity";
import { OrderRepository } from "./OrderEntryRepository";

export class OrderRepositoryImpl implements OrderRepository {
  async getAllOrders(): Promise<OrderDTO[]> {
    try {
      const db = await initializeDb();
      const HeadertableProperties = OrderHeaderModel.getTableColumns();
      const DetailableProperties = OrderHeaderModel.getTableColumns();
      const orderHeaders = await db.all("SELECT * FROM OrderHeader");
      const orderDetails = await db.all("SELECT * FROM OrderDetail");
      const orderDetailModels: OrderDetailDTO[] = [];
      
      for (const order of orderDetails) {
        orderDetailModels.push(
          mapInstance<any, OrderDetailDTO>(order, DetailableProperties)
        );
      }
      const orderMap = new Map<string, any>();
      for (const header of orderHeaders) {
        const mappedHeader = mapInstance<any, OrderHeaderDTO>(
          header,
          HeadertableProperties
        );
        orderMap.set(String(header.OrderID), { ...mappedHeader, details: [] });
      }
      for (const details of orderDetailModels) {
        const orderHeader = orderMap.get(String(details.orderID));
        if (orderHeader) {
          orderMap.set(String(details.orderID), {
            ...orderHeader,
            details: [...orderHeader.details, details],
          });
        }
      }
      return [...orderMap.values()];
    } catch (error) {
      throw new Error("Error Getting Orders");
    }
  }

  async getOneOrder(orderId: string): Promise<OrderDTO> {
    try {
      const db = await initializeDb();
      const orderHeaders: OrderHeaderDTO[] = await db.all(
        `SELECT * FROM OrderHeader where OrderId= ${orderId}`
      );
      const orderDetails: OrderDetailDTO[] = await db.all(
        `SELECT * FROM OrderDetail where OrderId= ${orderId} `
      );
      return { ...orderHeaders[0], details: orderDetails };
    } catch (error) {
      throw new Error("Error Getting Orders");
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const db = await initializeDb();
    let createdOrder: Order;

    try {
      const orderHeader = order.getHeader();
      const insertHeaderStatement = OrderHeaderModel.insert(orderHeader);

      // Start a transaction
      await db.exec("BEGIN TRANSACTION");

      // Insert the order header
      const headerResult = await db.run(insertHeaderStatement);
      const headerId = headerResult.lastID; // Get the last inserted ID for the header
      await db.exec("COMMIT");
    } catch (error) {
      // Rollback the transaction in case of an error
      if (error instanceof Error) {
        await db.exec("ROLLBACK");
        console.error(`Error creating order: ${error.message}`);
        throw new Error(`Error creating order: ${error.message}`);
      }
    } finally {
      await db.close();
    }

    return order;
  }
}
