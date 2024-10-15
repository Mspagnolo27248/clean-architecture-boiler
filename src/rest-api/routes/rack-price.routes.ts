import  { Router, Request, Response, NextFunction } from "express";
import { checkBodyMiddleware, RackPriceController } from "../controllers/rack-price-controller";




const rackPriceRoutes = Router();
rackPriceRoutes.get("/", async (req: Request, res: Response) => { }); 

rackPriceRoutes.post('/',  checkBodyMiddleware, RackPriceController.create);

rackPriceRoutes.put('/:id', async (req: Request, res: Response) => { });

rackPriceRoutes.delete('/', async (req: Request, res: Response) => { });

rackPriceRoutes.post('/convert',RackPriceController.convertToGallons);

rackPriceRoutes.post('/convertAllPrices',RackPriceController.getAllRackPricesConverted);

export default rackPriceRoutes;