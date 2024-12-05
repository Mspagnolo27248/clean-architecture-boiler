import  { Router, Request, Response, NextFunction } from "express";
import { checkBodyMiddleware, RackPriceController } from "../controllers/rack-price-controller";
import { PriceAgreement } from "../../core-layer/order-entry-module/domain-entities/PriceAgreement";


//URL: /rack-price

const rackPriceRoutes = Router();

rackPriceRoutes.post('/',  checkBodyMiddleware, RackPriceController.create);

rackPriceRoutes.post('/convert',RackPriceController.convertToGallons);

rackPriceRoutes.post('/convertAllPrices',RackPriceController.getAllRackPricesConverted);

rackPriceRoutes.put('/:id', async (req: Request, res: Response) => { });
rackPriceRoutes.delete('/', async (req: Request, res: Response) => { });
rackPriceRoutes.get("/", async (req: Request, res: Response) => {
    const  postedPriceAgreement = {
        productCode:'4315',
        containerCode:'460',
        customerCode:'255',
       // customerShipTo?:string,
       startDate:20240104,
        endDate:20241231
    }
    
    
    const priceAgreement = new PriceAgreement(postedPriceAgreement)
    
    const productCode  = priceAgreement.productCode;
    
    console.log(JSON.stringify(priceAgreement));

 }); 
rackPriceRoutes.get("/:id", async (req: Request, res: Response) => { }); 


export default rackPriceRoutes;