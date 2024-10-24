import { ProductDto, RackPriceDto } from "../data-transfer-objects/price-records-dtos";




export interface PricingRepository {
    createRackPrice(rackPrice: RackPriceDto): Promise<RackPriceDto>;
    getProductById(productId: string): Promise<ProductDto>;
    getAllRackPricing(): Promise<RackPriceDto[]> ;
    getAllProducts(): Promise<ProductDto[]>
    getOneUOMAndGallonFactor(productId: string, containerId: string, uom: string): Promise<{unitsOfMeasureInAContainer: number,gallonsInAContainer: number}>;    
    getManyUOMAndGallonFactor(productKeys: { productId: string, containerId: string, uoms: string }[]): Promise<ConversionFactorType>   
    
}

export type ConversionFactorType = Record<string, { unitsOfMeasureInAContainer: number, gallonsInAContainer: number }>

export type UOMAndGallonFactorCompositeKeyType = {
  productId: string, containerId: string, uom: string
}