import  { Router, Request, Response, NextFunction } from "express";
import { checkBodyMiddleware, RackPriceController } from "../controllers/rack-price-controller";



//URL: /rack-price

const rackPriceRoutes = Router();

rackPriceRoutes.post('/',  checkBodyMiddleware, RackPriceController.create);

rackPriceRoutes.post('/convert',RackPriceController.convertToGallons);

rackPriceRoutes.post('/convertAllPrices',RackPriceController.getAllRackPricesConverted);

rackPriceRoutes.put('/:id', async (req: Request, res: Response) => { });
rackPriceRoutes.delete('/', async (req: Request, res: Response) => { });
rackPriceRoutes.get("/", async (req: Request, res: Response) => { }); 
rackPriceRoutes.get("/:id", async (req: Request, res: Response) => { }); 


export default rackPriceRoutes;