import { OrderDetail } from "../../../shared-common/database/custom-orm/data-models/OrderDetail";
import { OrderHeader } from "../../../shared-common/database/custom-orm/data-models/OrderHeader";
import { initializeDb } from "../../../shared-common/database/sqlite";
import { Order } from "../domain-entities/OrderEntity";
import { OrderRepository } from "./OrderEntryRepository";

export class OrderRepositoryImpl implements OrderRepository {
    async createOrder(order: Order): Promise<Order> {
        const db = await initializeDb();
        let createdOrder: Order;  
        
        try {  
            const orderHeader = order.getHeader();
            const insertHeaderStatement = OrderHeader.insert(orderHeader);

            // Start a transaction
            await db.exec('BEGIN TRANSACTION');

            // Insert the order header
            const headerResult = await db.run(insertHeaderStatement);
            const headerId = headerResult.lastID; // Get the last inserted ID for the header
            
            // Insert order details
            // const orderDetails = order.getDetails();
            // const insertDetailStatements = orderDetails.map(detail => {
            //     const insertDetailStatement = OrderDetail.insert(detail);
            //     return db.run(insertDetailStatement);
            // });

            // Await all detail insertions
            // await Promise.all(insertDetailStatements);

            // Commit the transaction
            await db.exec('COMMIT');

            // Set created order with new header ID
            // createdOrder = new Order( orderHeader, orderDetails);
        } catch (error) {       
            // Rollback the transaction in case of an error
            if (error instanceof Error) {
              await db.exec('ROLLBACK');
              console.error(`Error creating order: ${error.message}`);
              throw new Error(`Error creating order: ${error.message}`);
            }

        } finally {      
            await db.close();
        } 

        return order;
    }
}
