import {OrderHeaderModel } from "../../../shared-common/database/custom-orm/data-models/OrderHeaderModel";
import { initializeDb } from "../../../shared-common/database/sqlite";
import { CompositeKeyGenerator } from "../../general/CompositeKeyGenerator";
import { OrderDTO } from "../data-transfer-objects/order-entry-dtos";
import { Order } from "../domain-entities/OrderEntity";
import { OrderRepository, UOMAndGallonFactorCompositeKeyType } from "./OrderEntryRepository";

export class OrderRepositoryImpl implements OrderRepository {

    async getAllOrders(): Promise<OrderDTO[]> {
        const db = await initializeDb();
         const data:OrderDTO[] =  await db.all('SELECT * FROM ORDERS');     
        return data


    }
    getOneOrder(orderId: string): Promise<OrderDTO | null> {
        throw new Error("Method not implemented.");
    }

    getOneUOMAndGallonFactor(productId: string, containerId: string, uom: string): Promise<{ unitsOfMeasureInAContainer: number; gallonsInAContainer: number; }> {
        const key = CompositeKeyGenerator.generateKey<UOMAndGallonFactorCompositeKeyType>({productId, containerId, uom});
        const uomAndGallonFactor = mockUOMAndGallonFactor[key as keyof typeof mockUOMAndGallonFactor];
        if (!uomAndGallonFactor) {
            throw new Error("UOM and Gallon Factor not found");
        }
        return Promise.resolve(uomAndGallonFactor);
    }
    getManyUOMAndGallonFactor(keys: { productId: string; containerId: string; uoms: string; }[]): Promise<{ [key: string]: { unitsOfMeasureInAContainer: number; gallonsInAContainer: number; }; }> {
        return Promise.resolve(mockUOMAndGallonFactor);
    }
    
    async createOrder(order: Order): Promise<Order> {
        const db = await initializeDb();
        let createdOrder: Order;  
        
        try {  
            const orderHeader = order.getHeader();
            const insertHeaderStatement = OrderHeaderModel.insert(orderHeader);

            // Start a transaction
            await db.exec('BEGIN TRANSACTION');

            // Insert the order header
            const headerResult = await db.run(insertHeaderStatement);
            const headerId = headerResult.lastID; // Get the last inserted ID for the header
            await db.exec('COMMIT');

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

//Mock Data
const mockUOMAndGallonFactor: Record<string, { unitsOfMeasureInAContainer: number; gallonsInAContainer: number }> = {
    "7946|846|EA": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: .55 },
    "7168|464|EA": { unitsOfMeasureInAContainer: 12, gallonsInAContainer: 3 },
    "7730|469|EA": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: 4.73 },
};
