// Domain Service: UnitOfMeasureConverterService

import { UnitOfMeasure } from "../enums/order-entry-enums";

type productLbsPerGallonLookup = {[productId:string]:number};
type gallonsPerEachLookup = {[productContainerId:string]:number};


export class UnitOfMeasureConverterService {

    private productLbsPerGallonLookup:productLbsPerGallonLookup;
    private gallonsPerEachLookup:gallonsPerEachLookup;

    constructor(productLbsPerGallonLookup:productLbsPerGallonLookup,gallonsPerEachLookup:gallonsPerEachLookup){
        this.productLbsPerGallonLookup = productLbsPerGallonLookup;
        this.gallonsPerEachLookup = gallonsPerEachLookup;
    }

    private calculateGallonsPerUom(productContainerId:string,unitOfMeasure:UnitOfMeasure): number {
        switch(unitOfMeasure){
            case UnitOfMeasure.GAL:
                return this.gallonsPerEachLookup[productContainerId];
            case UnitOfMeasure.LBS:
                return this.gallonsPerEachLookup[productContainerId];
            case UnitOfMeasure.KG:
                return this.gallonsPerEachLookup[productContainerId];
            case UnitOfMeasure.OZ:
                return this.gallonsPerEachLookup[productContainerId];
            case UnitOfMeasure.LI:
                return this.gallonsPerEachLookup[productContainerId];
        return this.gallonsPerEachLookup[productContainerId];
    }
    return 0;
    }
    convertVolumeToGallon(unitOfMeasure:UnitOfMeasure,volume: number): number {
   
        const gallonsPerEach = this.gallonsPerEachLookup[unitOfMeasure];
        console.log(`Converting ${volume} ${unitOfMeasure} to gallons.`);
        return 0; // Return converted volume
    }

    convertGallonToVolume(uom:string,volumeInGallon: number, targetUnit: string): number {
      
        console.log(`Converting ${volumeInGallon} gallons to ${targetUnit}.`);
        return 0; // Return converted volume
    }

  
     convertPriceToPerGallon(price: number, unit: string): number {
        console.log(`Converting ${price} per ${unit} to price per gallon.`);
        return 0; // Return converted price
    }


    convertGallonToPricePerUnit(pricePerGallon: number, targetUnit: string): number {
        // Example implementation stub: add logic to convert price per gallon to price per another unit
        console.log(`Converting ${pricePerGallon} per gallon to price per ${targetUnit}.`);
        return 0; // Return converted price
    }
}
