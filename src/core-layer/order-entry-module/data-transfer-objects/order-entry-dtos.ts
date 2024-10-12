import { UnitOfMeasure } from "../enums/order-entry-enums";




export interface OrderDetailDTO {
  orderDetailID: number;  
  orderID: string;  
  productID: string;
  containerID: string;
  quantity: number;
  unitPrice: number;
  uom: UnitOfMeasure;
}

export interface OrderHeaderDTO{
  orderID: number;  
  customerID: number;
  orderDate: string;
}

// OrderDTO combines OrderHeaderDTO and includes an additional details array
export interface OrderDTO extends OrderHeaderDTO {
  details: OrderDetailDTO[];
}