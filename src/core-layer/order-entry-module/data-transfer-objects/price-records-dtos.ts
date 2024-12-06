import { UnitOfMeasure } from "../enums/order-entry-enums";


export interface RackPriceDto {
    productId: string;
    containerId: string;
    rackPricePerUom: number;
    uom: UnitOfMeasure; //string
    effectiveDate: number;
    expirationDate: number;
 
}
export interface PriceAgreementDto {
productCode: string;
containerCode: string;
customerCode: string;
customerShipTo?: string;
startDate: number;
endDate: number;
}


export interface ProductDto {
    productId: string;
    productName: string;
    apiGravity: number;   
 
}


export interface SpecialPriceDTO {
    
}
