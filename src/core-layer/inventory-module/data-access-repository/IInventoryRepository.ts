//Get DTO's 
interface InventoryRepository  {
    getProductTankCombos:()=>ProductTankComboDTO[];
    getProductTankCombosByProduct:(oroduct:Number)=>ProductTankComboDTO[];
}