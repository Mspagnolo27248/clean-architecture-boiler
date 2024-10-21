import { ConversionFactorType, OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { PricingRepository } from "../data-access-repository/PricingRepository";
import { ProductDto, RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { UnitOfMeasureConverterService, UnitOfMeasureConverterServiceReturnType } from "../domain-services/UnitOfMeasureConverterService";

export type RackPricingWithGallons = RackPriceDto & { pricePerGallon: number };

export class GetRackPricingWithConversionsUseCase {
    constructor(
        private pricingRepository: PricingRepository,
        private orderRepository: OrderRepository
    ) { }

    public async execute(): Promise<RackPricingWithGallons[]> {
        try {
            const rackPricing = await this.getRackPricing();
            const productsMap = await this.getProductsMap();
            const conversionFactors = await this.getUOMAndGallonFactors(rackPricing);
            return this.calculateConvertedPricing(rackPricing, productsMap, conversionFactors);
        } catch (error) {
            this.handleError(error);
        }
    }

    // Fetch all rack pricing
    private async getRackPricing(): Promise<RackPriceDto[]> {
        return await this.pricingRepository.getAllRackPricing();
    }

    // Get products and map them by productId
    private async getProductsMap(): Promise<Map<string, ProductDto>> {
        const products = await this.pricingRepository.getAllProducts();
        return new Map(products.map(product => [String(product.productId), product]));
    }

    // Fetch the conversion factors
    private async getUOMAndGallonFactors(rackPricing: RackPriceDto[]) {
        const pricingDetails = rackPricing.map(record => ({
            productId: record.productId,
            containerId: record.containerId,
            uoms: record.uom
        }));

        return await this.orderRepository.getManyUOMAndGallonFactor(pricingDetails);
    }

    // Calculate and convert pricing using the retrieved data
    private calculateConvertedPricing(
        rackPricing: RackPriceDto[],
        productsMap: Map<string, ProductDto>,
        conversionFactors: ConversionFactorType
    ): RackPricingWithGallons[] {
        return rackPricing.map(record => {
            const inputToConvert = this.createConversionInput(record, productsMap);
            const conversions = UnitOfMeasureConverterService(inputToConvert, conversionFactors);
            return this.createRackPricingWithGallon(record, conversions);
        });
    }

    // Create conversion input based on record and products map
    private createConversionInput(record: RackPriceDto, productsMap: Map<string, ProductDto>) {
        const product = productsMap.get(record.productId);
        const apiGravity = product?.apiGravity || 20;

        return {
            product: record.productId,
            apiGravity,
            container: record.containerId,
            uom: record.uom,
            pricePerUnitOfMeasure: record.rackPricePerUom,
            qtyOfContainers: 1
        };
    }

    // Generate RackPricingWithGallons object from original record and conversion results
    private createRackPricingWithGallon(
        record: RackPriceDto,
        conversions: UnitOfMeasureConverterServiceReturnType
    ): RackPricingWithGallons {
        return {   }as RackPricingWithGallons}

    // Handle errors in a clean and consistent way
    private handleError(error: unknown): never {
        if (error instanceof Error) {
            console.error(`Error creating order: ${error.message}`);
            throw new Error(`Error creating order: ${error.message}`);
        }
        throw new Error("Unknown error occurred");
    }

}
