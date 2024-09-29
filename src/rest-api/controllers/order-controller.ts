import { OrderRepositoryImpl } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import { OrderDTO } from "../../core-layer/order-entry-module/data-transfer-objects/order-entry-dtos";
import { FreightType } from "../../core-layer/order-entry-module/enums/order-entry-enums";
import { CreateOrderUseCase } from "../../core-layer/order-entry-module/use-case-services/CreateOrderUseCase";
import { Request, Response } from 'express';

const orderRepository = new OrderRepositoryImpl();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);

export class OrderController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { productCode, quantity, totalPrice, freightType }:OrderDTO = req.body;

    try {
      // Validate freight type
      if (!Object.values(FreightType).includes(freightType)) {
        return res.status(400).json({ message: 'Invalid freight type' });
      }

      const orderDTO = new OrderDTO(productCode, quantity, totalPrice, freightType);
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
