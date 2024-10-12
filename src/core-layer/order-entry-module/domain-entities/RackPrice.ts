import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { UnitOfMeasure } from "../enums/order-entry-enums";


export class RackPrice {
 productId: string;
 containerId: string;
 rackPricePerUom: number;
 effectiveDate: number;
 expirationDate: number;
 uom: UnitOfMeasure;
 private rackPricePerGallon?: number; 

 constructor(rackPriceDto: RackPriceDto) {
    this.productId = rackPriceDto.productId;
    this.containerId = rackPriceDto.containerId;
    this.rackPricePerUom = rackPriceDto.rackPricePerUom;
    this.uom = rackPriceDto.uom;
    this.effectiveDate = rackPriceDto.effectiveDate;
    this.expirationDate = rackPriceDto.expirationDate;
 }

 public setRackPricePerGallon(GallonsPerUom: number): void {
    if (this.uom === UnitOfMeasure.GAL) {
        this.rackPricePerGallon = this.rackPricePerUom;
    }
    else {
        this.rackPricePerGallon = this.rackPricePerUom * GallonsPerUom;
    }
 }
 
 public getRackPricePerGallon(): number {
    if(this.rackPricePerGallon === undefined) {
        throw new Error('Rack price per gallon is not set');
    }
    return this.rackPricePerGallon;
 }
}