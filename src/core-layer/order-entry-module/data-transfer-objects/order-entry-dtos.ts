



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

// OrderDTO combines OrderHeaderDTO and includes an additional details array
export interface OrderDTO extends OrderHeaderDTO {
  details: OrderDetailDTO[];
}