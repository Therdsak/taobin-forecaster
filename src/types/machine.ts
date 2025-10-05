export type LocationType = "SCHOOL" | "SHOPPING MALL" | "HOSPITAL";

export interface Machine {
  id: string;
  name: string;
  locationType: LocationType;
  expectedSalesPerDay: number;
  averageProfitMarginPercentage: number;
  rentCostPerDay: number;
  electricCostPerTempPerDay: number;
}
