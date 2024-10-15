import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { PricingRepository } from "../data-access-repository/PricingRepository";
import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { UnitOfMeasureConverterService } from "../domain-services/UnitOfMeasureConverterService";
export type RackPricingWithGallons = RackPriceDto & { pricePerGallon: number }; 
export class GetRackPricingWithConversionsUseCase {
    constructor(private pricingRepository: PricingRepository, private orderRepository: OrderRepository) { }

    public async execute(): Promise<RackPricingWithGallons[]> {
        let output = [] as RackPricingWithGallons[];
        try {
            const rackPricing = await this.pricingRepository.getAllRackPricing();
            const products = await this.pricingRepository.getAllProducts();
            const productsMap = new Map(products.map((row)=>[String(row.productId),row]))
            const conversionFactors = await this.orderRepository
                .getManyUOMAndGallonFactor(rackPricing.map(row => ({ productId: row.productId, containerId: row.containerId, uoms: row.uom })));
            for(const record of rackPricing){
                const inputToConvert = {
                    product: record.productId,
                    apiGravity: productsMap.get(record.productId)?.apiGravity||20,
                    container: record.containerId,
                    uom: record.uom,
                    pricePerUnitOfMeasure: record.rackPricePerUom,
                    qtyOfContainers: 1}
                const recordConversions = UnitOfMeasureConverterService(inputToConvert,conversionFactors);
                output.push({...record,pricePerGallon:recordConversions.pricePerGallon})
            }   

        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating order: ${error.message}`);
                throw new Error(`Error creating order: ${error.message}`);
            }
        }
        return Promise.resolve(output);
    }

}
