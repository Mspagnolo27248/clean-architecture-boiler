import { UnitOfMeasure } from "../enums/order-entry-enums";


export interface OrderHeaderDTO{
  orderID: number;  
  customerID: number;
  orderDate: string;
  billedQtyUom?:number;
  billedRevenue?:number;
  billedGallons?:number;

}

export interface OrderDetailDTO {
  orderDetailID: number;  
  orderID: string;  
  productID: string;
  containerID: string;
  quantity: number;
  unitPrice: number;
  uom: UnitOfMeasure;
  billedQtyUom?:number;
  billedRevenue?:number;
  billedGallons?:number;
  billedPricePerGallon?:number;
}



// OrderDTO combines OrderHeaderDTO and includes an additional details array
export interface OrderDTO extends OrderHeaderDTO {
  details: OrderDetailDTO[];
}