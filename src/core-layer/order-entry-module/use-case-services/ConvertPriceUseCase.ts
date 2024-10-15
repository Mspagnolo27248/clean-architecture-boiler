import { OrderRepository } from "../data-access-repository/OrderEntryRepository";
import { RackPriceDto } from "../data-transfer-objects/price-records-dtos";
import { UnitOfMeasureConverterService, UnitOfMeasureConverterServiceReturnType } from "../domain-services/UnitOfMeasureConverterService";

export class ConvertPriceUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute(priceRecord: RackPriceDto): Promise<UnitOfMeasureConverterServiceReturnType> {
    const {
      productId,
      containerId,
      uom,
      rackPricePerUom,
    } = priceRecord;
    const gallonsFactors = await this.orderRepository.getManyUOMAndGallonFactor(
      [{ productId: productId, containerId: containerId, uoms: uom }]
    );
    const convertedPrice = UnitOfMeasureConverterService(
      {
        product: productId,
        apiGravity:1, //Need to looup the APIgravity
        container: containerId,
        uom: uom,
        pricePerUnitOfMeasure: rackPricePerUom,
        qtyOfContainers: 1,
      },
      gallonsFactors
    );
    console.log(convertedPrice);
    return convertedPrice;
  }
}
