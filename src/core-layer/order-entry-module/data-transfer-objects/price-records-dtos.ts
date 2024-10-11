

export interface RackPriceDto {
    productId: string;
    containerId: string;
    rackPricePerUom: number;
    effectiveDate: Date;
    expirationDate: Date;
    uom: string;
    rackPricePerGallon: number;

}


// interface AgreementPriceDto {
//     agreementPrice: number;
//     effectiveDate: Date;
//     expirationDate: Date;
// }