import { FreightType } from "../enums/order-entry-enums";



export class OrderDTO {
  constructor(
    public productCode: string,
    public quantity: number,
    public totalPrice: number,
    public freightType: FreightType
  ) {}
}
