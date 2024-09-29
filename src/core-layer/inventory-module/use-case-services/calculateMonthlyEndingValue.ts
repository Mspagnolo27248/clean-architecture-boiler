import { UseCase } from "../../general-interfaces/UseCase";

type calcualteMonthylEndingValuesProps = {
  YYYYMM: Number;
};

export class CalculateMonthlyEndingValues extends UseCase<calcualteMonthylEndingValuesProps> {
 private endingInventoryQty = [];
 
 
    constructor({ YYYYMM }: calcualteMonthylEndingValuesProps) {
    super({ YYYYMM });
  }

  execute(): boolean {
    console.log(`Processing for YYYYMM: ${this.data?.YYYYMM}`);
    return true;
  }
}
