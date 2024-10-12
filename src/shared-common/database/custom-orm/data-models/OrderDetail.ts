import { OrderDetailDTO } from "../../../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { UnitOfMeasure } from "../../../../core-layer/order-entry-module/enums/order-entry-enums";
import { ARGModel, KeyField } from "../orm-decorators";
import { ORM } from "../parent-class-orm";



@ARGModel('OrderDetail')
export class OrderDetail extends ORM  implements OrderDetailDTO{
    @KeyField
    orderDetailID: number = 0;  // Primary key
    @KeyField
    orderID: string = '';  // Foreign key to OrderHeader
    productID: string = '0';
    quantity: number = 0;
    unitPrice: number = 0;   
    lineTotal: number = 0;
    containerID: string = '';
    uom: UnitOfMeasure = UnitOfMeasure.GAL;
}
