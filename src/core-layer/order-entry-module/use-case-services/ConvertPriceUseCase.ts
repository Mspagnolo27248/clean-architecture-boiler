import { PricingRepository } from "../data-access-repository/PricingRepository";
import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { UnitOfMeasureConverterService, UnitOfMeasureConverterServiceReturnType } from "../domain-services/UnitOfMeasureConverterService";

export class ConvertPriceUseCase {
  constructor(private priceRepository: PricingRepository) { }

  public async execute(priceRecord: RackPriceDto): Promise<UnitOfMeasureConverterServiceReturnType> {
    const {productId,containerId,uom,rackPricePerUom,} = priceRecord;
    
    const gallonsFactors = await this.priceRepository.getManyUOMAndGallonFactor(
      [{ productId: productId, containerId: containerId, uoms: uom }]
    );
    const product = await this.priceRepository.getProductById(productId);
    const convertedPrice = UnitOfMeasureConverterService(
      {
        product: productId,
        apiGravity: product.apiGravity, 
        container: containerId,
        uom: uom,
        pricePerUnitOfMeasure: rackPricePerUom,
        qtyOfContainers: 1,
      },
      gallonsFactors
    );
    return convertedPrice;
  }
}
