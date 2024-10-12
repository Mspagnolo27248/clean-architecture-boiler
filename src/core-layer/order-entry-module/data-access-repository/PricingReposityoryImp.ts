import { initializeDb } from "../../../shared-common/database/sqlite";
import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { RackPrice } from "../domain-entities/RackPrice";
import { PricingRepository } from "./PricingRepository";


export class PricingRepositoryImp implements PricingRepository {
    async createRackPrice(rackPriceDto: RackPriceDto): Promise<RackPrice> {
    const db = await initializeDb();
    try {
         let cretedRackPrice = await db.run(
            `INSERT INTO RackPricing ( `+
            `productId,containerId,rackPricePerUom,effectiveDate,expirationDate,uom,rackPricePerGallon`+
            `) VALUES (?,?,?,?,?,?)`, 
            [rackPriceDto.productId,rackPriceDto.containerId,
            rackPriceDto.rackPricePerUom,rackPriceDto.effectiveDate,
            rackPriceDto.expirationDate,rackPriceDto.uom]);        
            const createdRackPrice: RackPrice = new RackPrice(rackPriceDto);
            return createdRackPrice;

    } catch (error) {       
        if (error instanceof Error) {
          console.error(`Error creating order: ${error.message}`);
          throw new Error(`Error creating order: ${error.message}`);
        }

    } finally {      
        await db.close();
    } 
  throw new Error('Error creating order');  
}

async getProductById(productId: string): Promise<Product | null> {
    const db = await initializeDb();
    try {
        const product = await db.get('SELECT * FROM Product WHERE productId = ?', [productId]);
        return product;
    } catch (error) {
        if(error instanceof Error) {
        console.error(`Error getting product by ID: ${error.message}`);
        throw new Error(`Error getting product by ID: ${error.message}`);
        }
    } finally {
        await db.close();
    }
    return null;
}
}