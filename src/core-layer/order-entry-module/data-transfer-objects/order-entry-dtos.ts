import { FreightType } from "../enums/order-entry-enums";



export interface OrderDetailDTO {
  orderDetailID: number;  
  orderID: number;  
  productID: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderHeaderDTO{
  orderID: number;  
  customerID: number;
  orderDate: string;
  totalAmount: number;  
}
