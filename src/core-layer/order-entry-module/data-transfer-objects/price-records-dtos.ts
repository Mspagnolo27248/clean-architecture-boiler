import { UnitOfMeasure } from "../enums/order-entry-enums";


export interface RackPriceDto {
    productId: string;
    containerId: string;
    rackPricePerUom: number;
    uom: UnitOfMeasure; //string
    effectiveDate: number;
    expirationDate: number;
 
}



export interface ProductDto {
    productId: string;
    productName: string;
    apiGravity: number;   
 
}

