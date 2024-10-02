import { OrderDetailDTO } from "../../../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { ARGModel, KeyField } from "../orm-decorators";
import { ORM } from "../parent-class-orm";



@ARGModel('OrderDetail')
export class OrderDetail extends ORM  implements OrderDetailDTO{
    @KeyField
    orderDetailID: number = 0;  // Primary key
    @KeyField
    orderID: number = 0;  // Foreign key to OrderHeader
    productID: number = 0;
    quantity: number = 0;
    unitPrice: number = 0;   
    lineTotal: number = 0;

  
}
