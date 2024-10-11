import { RackPrice } from "../domain-entities/RackPrice";



export interface PricingRepository {
    createRackPrice(rackPrice: RackPrice): Promise<RackPrice>;
    getProductById(productId: string): Promise<Product | null>;
}
