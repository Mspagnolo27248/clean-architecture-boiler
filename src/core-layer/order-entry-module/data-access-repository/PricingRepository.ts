import { ProductDto, RackPriceDto } from "../data-transfer-objects/price-records-dtos";




export interface PricingRepository {
    createRackPrice(rackPrice: RackPriceDto): Promise<RackPriceDto>;
    getProductById(productId: string): Promise<ProductDto>;
    getAllRackPricing(): Promise<RackPriceDto[]> ;
    getAllProducts(): Promise<ProductDto[]>
}
