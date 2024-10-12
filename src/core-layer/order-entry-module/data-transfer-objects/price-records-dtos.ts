import { UnitOfMeasure } from "../enums/order-entry-enums";


export interface RackPriceDto {
    productId: string;
    containerId: string;
    rackPricePerUom: number;
    effectiveDate: number;
    expirationDate: number;
    uom: UnitOfMeasure;
}

