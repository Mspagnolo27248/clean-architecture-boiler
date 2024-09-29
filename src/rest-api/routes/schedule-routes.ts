import  { Router, Request, Response, NextFunction } from "express";
// import {  updateSchedule } from "../controllers/schedule-controller";
// A route file simply maps the http verbs to the contoller functions
// it also allows the concrete imp of the route query params
// This is still part of the presentation layer the controller will need to convert the query params into
// interface params or DTO's that the core-layer defines. The routes and controller are dependant on the core not the other way.
const schedule = Router();

schedule.get("/", async (req: Request, res: Response) => { }); 
schedule.post('/', async (req: Request, res: Response) => { });
//schedule.put('/:unit/:date/:productCode', updateSchedule);
schedule.delete('/', async (req: Request, res: Response) => { });

export default schedule;


// The handler must be of this type....
//(req: Request, res: Response, next: NextFunction) => void | Promise<void>