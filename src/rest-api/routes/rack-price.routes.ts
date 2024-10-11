import  { Router, Request, Response, NextFunction } from "express";
import { checkBodyMiddleware, RackPriceController } from "../controllers/rack-price-controller";




const rackPriceRoutes = Router();
rackPriceRoutes.get("/", async (req: Request, res: Response) => { }); 

rackPriceRoutes.post('/', 
    (req: Request, res: Response, next: NextFunction) => {
        console.log('I ran before everything');
        next();
    },
    checkBodyMiddleware,
    RackPriceController.create
);

rackPriceRoutes.put('/:id', async (req: Request, res: Response) => { });

rackPriceRoutes.delete('/', async (req: Request, res: Response) => { });

export default rackPriceRoutes;