
import { UnitOfMeasureConverterService } from "../order-entry-module/domain-services/UnitOfMeasureConverterService";


const mockUOMAndGallonFactor: Record<string, { unitsOfMeasureInAContainer: number; gallonsInAContainer: number }> = {
    "7946|846|EA": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: .55 },
    "7168|464|EA": { unitsOfMeasureInAContainer: 12, gallonsInAContainer: 3 },
    "7730|469|EA": { unitsOfMeasureInAContainer: 1, gallonsInAContainer: 4.73 },
};

// const inputsToConvert = {
// product: '7946', 
// apiGravity: 30, 
// container: '846', 
// uom: 'EA', 
// pricePerUnitOfMeasure: 7.77, 
// qtyOfContainers: 1 
// }


const inputsToConvert = {
    product: '7776', 
    apiGravity: 27.4, 
    container: '846', 
    uom: 'LBS', 
    pricePerUnitOfMeasure: 1.468, 
    qtyOfContainers: 1 
    }
const results = UnitOfMeasureConverterService(inputsToConvert,mockUOMAndGallonFactor);
console.log(JSON.stringify(results));