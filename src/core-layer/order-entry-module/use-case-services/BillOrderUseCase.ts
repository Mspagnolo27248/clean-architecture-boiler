import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { OrderDTO } from "../data-transfer-objects/order-entry-dtos";



export class BillOrderUseCase{
    constructor(private orderRepository: OrderRepository) {}

    public async execute(orderDTO:OrderDTO):Promise<OrderDTO>{
    return Promise.resolve(orderDTO);
    }

    
}
