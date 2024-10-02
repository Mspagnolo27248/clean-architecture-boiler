import { OrderHeaderDTO } from "../../../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { ARGModel, KeyField } from "../orm-decorators";
import { ORM } from "../parent-class-orm";

@ARGModel('OrderHeader')
export class OrderHeader extends ORM implements OrderHeaderDTO{
    @KeyField
    orderID: number = 0;  // Primary key
    customerID: number = 0;
    orderDate: string = '';  // Can default to current date in actual usage
    totalAmount: number = 0;

}
