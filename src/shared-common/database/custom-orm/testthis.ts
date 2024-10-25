import { Console } from "console";
import { OrderRepositoryImpl } from "../../../core-layer/order-entry-module/data-access-repository/OrderEntryRepositoryImp";
import { Order } from "../../../core-layer/order-entry-module/domain-entities/OrderEntity";
import { UnitOfMeasure } from "../../../core-layer/order-entry-module/enums/order-entry-enums";
import { OrderHeaderModel } from "./data-models/OrderHeaderModel";

const repo = new OrderRepositoryImpl()

const mydata = new Order( {
    orderID: 412,
    customerID: 2000,
    orderDate: "2024-01-12",
    billedQtyUom: 200,
    billedRevenue: 1000,
    billedGallons: 300,
    details:[{
    orderDetailID: 2,
    orderID: "412",
    productID: "P003",
    quantity: 15,
    unitPrice: 40,
    containerID: "C003",
    uom: UnitOfMeasure.GAL}
]
})


// const modelProperties = OrderHeaderModel.getModelProperties();
// const tableColums = OrderHeaderModel.getTableColumns();
// console.log(modelProperties)
// console.log(tableColums)


// const mappedOutut = OrderHeaderModel.mapRecordToModel(mydata,OrderHeaderModel);
// console.log(JSON.stringify(mappedOutut))


// const sql = OrderHeaderModel.insert(mydata.getHeader())
// console.log(sql)

 repo.createOrder(mydata).then(
order => console.log(order)
)
