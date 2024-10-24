import { OrderRepositoryImpl } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import {OrderDTO } from "../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { BillOrderUseCase } from "../../core-layer/order-entry-module/use-case-services/BillOrderUseCase";
import { CreateOrderUseCase } from "../../core-layer/order-entry-module/use-case-services/CreateOrderUseCase";
import { Request, Response } from 'express';
import { GetAllOrdersUseCase } from "../../core-layer/order-entry-module/use-case-services/GetAllOrdersUseCase";
import { PricingRepositoryImp } from "../../core-layer/order-entry-module/data-access-repository/PricingReposityoryImp";

//Dependecy Injection Section
const orderRepository = new OrderRepositoryImpl();

const priceRepository = new PricingRepositoryImp();


export class OrderController {

  static async create(req: Request, res: Response): Promise<Response> {
    const createOrderUseCase = new CreateOrderUseCase(orderRepository);
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

  static async getAllOrders(req: Request, res: Response) {

    try {
      const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
      const result = await getAllOrdersUseCase.execute();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Error getting all orders" });
    }
  }

static async billOrder(req: Request, res: Response) {
  const billOrderUseCase = new BillOrderUseCase(orderRepository,priceRepository)
  try {
      const orderDTO:OrderDTO = req.body
      const result = await billOrderUseCase.execute(orderDTO);      
      return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message:error.message });
    } else {
      console.error("An unknown error occurred");
    }
      return res.status(500).json({ message: 'Error billing the order' });
  }
}

}