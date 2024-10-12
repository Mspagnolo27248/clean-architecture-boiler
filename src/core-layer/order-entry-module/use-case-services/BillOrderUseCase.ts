import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { OrderDTO } from "../data-transfer-objects/order-entry-dtos";
import { Order } from "../domain-entities/OrderEntity";



export class BillOrderUseCase{
    constructor(private orderRepository: OrderRepository) {}
    public async execute(orderDTO:OrderDTO):Promise<OrderDTO>{
        const order = new Order(orderDTO);
        const  gallonsFactors = await this.orderRepository.getManyUOMAndGallonFactor(order.getDetails().map(detail=>({productId:detail.productID,containerId:detail.containerID,uoms:detail.uom})));
        //Calculate billedQtyUom
         order.setBillingInfomation(gallonsFactors);

    return Promise.resolve(orderDTO);
    }

    
}
