

 interface ProductTankComboDTO {
    productCode:Number;
    tankCode:Number;
}

interface InventoryTransactionDTO{
    productCode:Number;
    tankCode:Number;
    transactionType:InventoryTransactionEnum;
    yyyyMMdd:Number;
    quantity:Number;
}