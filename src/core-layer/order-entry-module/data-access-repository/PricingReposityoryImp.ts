import { initializeDb } from "../../../shared-common/database/sqlite";
import { ProductDto, RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { RackPrice } from "../domain-entities/RackPrice";
import { PricingRepository } from "./PricingRepository";


export class PricingRepositoryImp implements PricingRepository {
    async createRackPrice(rackPriceDto: RackPriceDto): Promise<RackPriceDto> {
    const db = await initializeDb();
    try {
         let results = await db.run(
            `INSERT INTO RackPrice ( `+
            `productId,containerId,rackPricePerUom,effectiveDate,expirationDate,uom`+
            `) VALUES (?,?,?,?,?,?)`, 
            [rackPriceDto.productId,rackPriceDto.containerId,
            rackPriceDto.rackPricePerUom,rackPriceDto.effectiveDate,
            rackPriceDto.expirationDate,rackPriceDto.uom]);        
            
            return rackPriceDto;

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

async getProductById(productId: string): Promise<ProductDto> {
    const db = await initializeDb();
    try {
        const product = await db.get('SELECT * FROM Product WHERE productId = ?', [productId]);
        return product;
    } catch (error) {
        if(error instanceof Error) {
        console.error(`Error getting product by ID: ${error.message}`);
        throw new Error(`Error getting product by ID: ${error.message}`);
        }
        throw new Error(`Error getting product by ID: `);
    } finally {
        await db.close();
    }

}



async getAllRackPricing(): Promise<RackPriceDto[]> {
    const db = await initializeDb();
    try {
        const rackPriceRecords = await db.all('SELECT * FROM RackPrice');
        return rackPriceRecords;
        
    } catch (error) {
        if(error instanceof Error) {
        throw new Error(`Error getting rackPriceRecords${error.message}`);
        }
        throw new Error('Errpr getting all rackprice records')
    } finally {
        await db.close();
    }
   
}




async getAllProducts(): Promise<ProductDto[]> {
    const db = await initializeDb();
    try {
        const product = await db.all('SELECT * FROM Product');
        return product;
    } catch (error) {
        if(error instanceof Error) {
        throw new Error(`Error getting rackPriceRecords${error.message}`);
        }
        throw new Error('Errpr getting all rackprice records')
    } finally {
        await db.close();
    }
   
}

}