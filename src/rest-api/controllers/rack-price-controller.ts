import { NextFunction, Request, Response } from "express";
import { PricingRepositoryImp } from "../../core-layer/order-entry-module/data-access-repository/PricingReposityoryImp";
import { RackPriceDto } from "../../core-layer/order-entry-module/data-transfer-objects/price-records-dtos";
import { CreateRackPriceUseCase } from "../../core-layer/order-entry-module/use-case-services/CreateRackPriceUseCase";
import { PricingRepository } from "../../core-layer/order-entry-module/data-access-repository/PricingRepository";
import { OrderRepository } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepository";
import { OrderRepositoryImpl } from "../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import { ConvertPriceUseCase } from "../../core-layer/order-entry-module/use-case-services/ConvertPriceUseCase";

const pricingRepository: PricingRepository = new PricingRepositoryImp();
const orderRepository: OrderRepository = new OrderRepositoryImpl();
const createRackPriceUseCase: CreateRackPriceUseCase =
  new CreateRackPriceUseCase(pricingRepository);
const convertPriceRecordToGallons: ConvertPriceUseCase =
  new ConvertPriceUseCase(orderRepository);

export class RackPriceController {
  static async create(req: Request, res: Response) {
    try {
      const rackPriceDto = req.body as RackPriceDto;
      const rackPrice = await createRackPriceUseCase.execute(rackPriceDto);
      return res.status(201).json(rackPrice);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        console.error("An unknown error occurred");
      }
      return res.status(500).json({ message: "Error" });
    }
  }

  static async convertToGallons(req: Request, res: Response) {
    try {
      const priceRecord = req.body as RackPriceDto;
      const convertedPrice = await convertPriceRecordToGallons.execute(priceRecord);
      return res.status(200).json(convertedPrice);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        console.error("An unknown error occurred");
      }
    }
  }
}

export const checkBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    productId,
    containerId,
    rackPricePerUom,
    effectiveDate,
    expirationDate,
    uom,
    rackPricePerGallon,
  } = req.body;

  // Check if all required fields are present and of the correct type
  if (
    typeof productId !== "string" ||
    typeof containerId !== "string" ||
    typeof rackPricePerUom !== "number" ||
    typeof rackPricePerGallon !== "number" ||
    typeof uom !== "string"
  )
    return res
      .status(400)
      .json({ error: "Invalid request body. Ensure all fields are correct." });

  console.log("middle ware log");
  next();
};
