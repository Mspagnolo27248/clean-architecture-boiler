
export type UnitOfMeasureConverterServiceReturnType = {
   qtyInGallons:number,
    qtyInUnitsOfMeasure:number,
    totalDollars:number,
    pricePerGallon:number
}

export function UnitOfMeasureConverterService(
    inputsToConvert: { product: string, container: string, uom: string, pricePerUnitOfMeasure: number, qtyOfContainers: number },
    conversionFactors: Record<string, { unitsOfMeasureInAContainer: number, gallonsInAContainer: number }>
): UnitOfMeasureConverterServiceReturnType
{   
    const {product,container,uom,pricePerUnitOfMeasure,qtyOfContainers} = inputsToConvert;
    const conversions = conversionFactors[`${product}|${container}|${uom}`];
    const qtyInGallons = qtyOfContainers * conversions.gallonsInAContainer;
    const qtyInUnitsOfMeasure = qtyOfContainers * conversions.unitsOfMeasureInAContainer;
    const totalDollars = qtyInUnitsOfMeasure * pricePerUnitOfMeasure;
    const pricePerGallon = totalDollars / qtyInGallons;

    return {
        qtyInGallons,
        qtyInUnitsOfMeasure,
        totalDollars,
        pricePerGallon
    }
}
