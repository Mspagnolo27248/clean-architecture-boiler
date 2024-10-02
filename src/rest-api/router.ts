import { Router } from "express";
import ordersRoutes from "./routes/orders-routes";


const router = Router();
// ****define Resource endpoints root paths and the files that specify the http verb paths.***
//Note Routes should be lowercase and kebab case*/
//Should we create a stadard return object like {"data":[] , "success":[], count:int*/ 

/*This should be a list of Resources*/
router.use('/orders',ordersRoutes);
//router.use('/endpoit1',blendRequirements);
//router.use('/endpoint2',blendRequirements);



export default router;