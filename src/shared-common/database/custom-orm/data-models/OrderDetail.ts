import { OrderDetailDTO } from "../../../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { UnitOfMeasure } from "../../../../core-layer/order-entry-module/enums/order-entry-enums";
import { ARGModel, KeyField, TableColumn } from "../orm-decorators";
import { ORM } from "../parent-class-orm";



@ARGModel('OrderDetail')
export class OrderDetail extends ORM  implements OrderDetailDTO{
    @KeyField
    @TableColumn('OrderID')
    orderDetailID: number = 0;  // Primary key

    @KeyField
    @TableColumn('OrderID')
    orderID: string = '';  // Foreign key to OrderHeader

    @TableColumn('ProductID')
    productID: string = '0';

    @TableColumn('Quantity')
    quantity: number = 0;

    @TableColumn('UnitPrice')
    unitPrice: number = 0;   

    @TableColumn('ContainerID')
    containerID: string = '';
    
    @TableColumn('UOM')
    uom: UnitOfMeasure = UnitOfMeasure.GAL;
}


