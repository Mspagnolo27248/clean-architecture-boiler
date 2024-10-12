import  { Router, Request, Response, NextFunction } from "express";
import { OrderController } from "../controllers/order-controller";



const ordersRoutes = Router();
ordersRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const result = await OrderController.getAllOrders(req, res);
    return result;
  } catch (error) {
    return res.status(500).json({ message: "Error getting orders" });
  }
}); 

ordersRoutes.post('/', async (req: Request, res: Response) => {
    try {  
      const result = await OrderController.create(req, res);
      return result; 
    } catch (error) {
      return res.status(500).json({ message: "Error creating order" });
    }
  });

ordersRoutes.put('/:id', (req: Request, res: Response) => { });

ordersRoutes.delete('/', async (req: Request, res: Response) => { });

export default ordersRoutes;