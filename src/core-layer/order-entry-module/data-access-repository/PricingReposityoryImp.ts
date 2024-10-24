import { initializeDb } from "../../../shared-common/database/sqlite";
import { CompositeKeyGenerator } from "../../general/CompositeKeyGenerator";
import { ProductDto, RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { PricingRepository, UOMAndGallonFactorCompositeKeyType } from "./PricingRepository";


export class PricingRepositoryImp implements PricingRepository {


    async createRackPrice(rackPriceDto: RackPriceDto): Promise<RackPriceDto> {
        const db = await initializeDb();
        try {
            let results = await db.run(
                `INSERT INTO RackPrice ( ` +
                `productId,containerId,rackPricePerUom,effectiveDate,expirationDate,uom` +
                `) VALUES (?,?,?,?,?,?)`,
                [rackPriceDto.productId, rackPriceDto.containerId,
                rackPriceDto.rackPricePerUom, rackPriceDto.effectiveDate,
                rackPriceDto.expirationDate, rackPriceDto.uom]);
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
            if (error instanceof Error) {
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
            if (error instanceof Error) {
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
            if (error instanceof Error) {
                throw new Error(`Error getting rackPriceRecords${error.message}`);
            }
            throw new Error('Errpr getting all rackprice records')
        } finally {
            await db.close();
        }
    }


    getOneUOMAndGallonFactor(productId: string, containerId: string, uom: string): Promise<{ unitsOfMeasureInAContainer: number; gallonsInAContainer: number; }> {
        const key = CompositeKeyGenerator.generateKey<UOMAndGallonFactorCompositeKeyType>({ productId, containerId, uom });
        const uomAndGallonFactor = mockUOMAndGallonFactor[key as keyof typeof mockUOMAndGallonFactor];
        if (!uomAndGallonFactor) {
            throw new Error("UOM and Gallon Factor not found");
        }
        return Promise.resolve(uomAndGallonFactor);
    }


    getManyUOMAndGallonFactor(keys: { productId: string; containerId: string; uoms: string; }[]): Promise<{ [key: string]: { unitsOfMeasureInAContainer: number; gallonsInAContainer: number; }; }> {
        return Promise.resolve(mockUOMAndGallonFactor);
    }


}


//Mock Data
const mockUOMAndGallonFactor: Record<string, { unitsOfMeasureInAContainer: number; gallonsInAContainer: number }> = {
    "7946|846|EA": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: .5548 },
    "7168|464|EA": { unitsOfMeasureInAContainer: 12, gallonsInAContainer: 3 },
    "7730|469|PAL": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: 4.73 },
};
