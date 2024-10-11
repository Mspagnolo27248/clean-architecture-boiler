import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";


export class RackPrice {
 productId: any;
 containerId: any;
 rackPricePerUom: any;
 effectiveDate: any;
 expirationDate: any;
 uom: any;
 rackPricePerGallon: any; 

 constructor(rackPriceDto: RackPriceDto) {
    this.productId = rackPriceDto.productId;
    this.containerId = rackPriceDto.containerId;
    this.rackPricePerUom = rackPriceDto.rackPricePerUom;
    this.effectiveDate = rackPriceDto.effectiveDate;
    this.expirationDate = rackPriceDto.expirationDate;
    this.uom = rackPriceDto.uom;
    this.rackPricePerGallon = rackPriceDto.rackPricePerGallon;

 }
}
