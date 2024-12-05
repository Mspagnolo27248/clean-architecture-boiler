import {PriceAgreement } from "../order-entry-module/domain-entities/PriceAgreement"


const  postedPriceAgreement = {
    productCode:'4315',
    containerCode:'460',
    customerCode:'255',
   // customerShipTo?:string,
   startDate:20240104,
    endDate:20241231
}

const  PriceAgreementDTO =   {
    productCode: 'string',
    containerCode: 'string',
    customerCode: 'string',
    customerShipTo: 'string',
    startDate: 1,
    endDate: 1
}

const priceAgreement = new PriceAgreement(postedPriceAgreement)

const productCode  = priceAgreement.productCode;

console.log(JSON.stringify(priceAgreement));

const priceDTO = mapEntityToDTO(priceAgreement)

console.log(JSON.stringify(priceDTO));



function mapEntityToDTO<T extends object>(entity: T): Partial<T> {
    const dto: Partial<T> = {};

    // Get all property names from the instance and its prototype chain
    const propertyNames = [
        ...Object.getOwnPropertyNames(entity), // Instance properties
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(entity)) // Prototype properties (getters, etc.)
    ];

    propertyNames.forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(entity, key);

        // If the property is a getter (or a regular property)
        if (descriptor && typeof descriptor.get === 'function') {
            // Add getter properties
            dto[key as keyof T] = entity[key as keyof T];
        } else if (typeof entity[key as keyof T] !== 'function') {
            // Add regular properties, but exclude methods (functions)
            dto[key as keyof T] = entity[key as keyof T];
        }
    });

    return dto;
}









