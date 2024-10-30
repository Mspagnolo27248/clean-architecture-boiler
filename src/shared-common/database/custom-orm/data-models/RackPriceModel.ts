import { RackPriceDto } from "../../../../core-layer/order-entry-module/data-transfer-objects/price-records-dtos";
import { UnitOfMeasure } from "../../../../core-layer/order-entry-module/enums/order-entry-enums";
import { ORM } from "../parent-class-orm";




export class RackPriceModel extends ORM implements RackPriceDto {

    productId: string = '';
    containerId: string = '';
    rackPricePerUom: number = 0;
    uom: UnitOfMeasure = UnitOfMeasure.GAL;
    effectiveDate: number = 0;
    expirationDate: number = 0;
    

}