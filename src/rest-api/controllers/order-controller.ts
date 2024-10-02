import { OrderRepositoryImpl } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import {OrderDTO } from "../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { Order } from "../../core-layer/order-entry-module/domain-entities/OrderEntity";
import { CreateOrderUseCase } from "../../core-layer/order-entry-module/use-case-services/CreateOrderUseCase";
import { Request, Response } from 'express';

//Dependecy Injection Section
const orderRepository = new OrderRepositoryImpl();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);

export class OrderController {
  static async create(req: Request, res: Response): Promise<Response> {
    const orderDTO:OrderDTO = req.body; //Need to validate this in middleware. 
  
    try {    
      const createdOrder = await createOrderUseCase.execute(orderDTO);
      return res.status(201).json(createdOrder);
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