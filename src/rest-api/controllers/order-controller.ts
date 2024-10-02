import { OrderRepositoryImpl } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import { OrderDetailDTO, OrderHeaderDTO } from "../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { Order } from "../../core-layer/order-entry-module/domain-entities/OrderEntity";
import { CreateOrderUseCase } from "../../core-layer/order-entry-module/use-case-services/CreateOrderUseCase";
import { Request, Response } from 'express';

//Dependecy Injection
const orderRepository = new OrderRepositoryImpl();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);

export class OrderController {
  static async create(req: Request, res: Response): Promise<Response> {
    const orderHeader:OrderHeaderDTO = req.body.orderHeader;
    const orderDetails:OrderDetailDTO[] = req.body.orderDetails;
  
    try {  
      const orderDTO = new Order(orderHeader,orderDetails);
      const order = await createOrderUseCase.execute(orderDTO);
      return res.status(201).json(order);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message:error.message });
          } else {
            console.error("An unknown error occurred");
          }
      return res.status(500).json({ message: "Error" });
    }
  }
}

//  Validate with enums
// const validateFreightType = (freightType:string):void=>{
//   if (!Object.values(FreightType).includes(freightType as 
//   FreightType)) {
//   throw new AppError('Invalid Freight Type', 400);
// }
//}