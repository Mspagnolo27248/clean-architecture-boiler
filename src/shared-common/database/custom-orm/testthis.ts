import { OrderHeaderModel } from "./data-models/OrderHeaderModel";



const mydata =  {
OrderID: 1,
CustomerID: 1000,
OrderDate: "2024-01-10",
BilledQtyUom: 100,
BilledRevenue: 500.5,
BilledGallons: 150
}


const modelProperties = OrderHeaderModel.getModelProperties();
const tableColums = OrderHeaderModel.getTableColumns();
console.log(modelProperties)
console.log(tableColums)


const mappedOutut = OrderHeaderModel.mapRecordToModel(mydata,OrderHeaderModel);
console.log(JSON.stringify(mappedOutut))

