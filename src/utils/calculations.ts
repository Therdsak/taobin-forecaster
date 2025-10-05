import { Machine } from "../types/machine";

export const calculateDailyProfit = (machine: Machine, avgTemp: number) => {
  const grossProfit =
    machine.expectedSalesPerDay * machine.averageProfitMarginPercentage;
  const electricity = machine.electricCostPerTempPerDay * avgTemp;
  return grossProfit - machine.rentCostPerDay - electricity;
};

export const calculateCumulativeWeekly = (
  machines: Machine[],
  dailyTemps: number[]
) => {
  let totalRevenue = 0,
    totalRent = 0,
    totalElectricity = 0,
    totalProfit = 0;

  machines.forEach((machine) => {
    dailyTemps.forEach((temp) => {
      totalRevenue += machine.expectedSalesPerDay;
      totalRent += machine.rentCostPerDay;
      totalElectricity += machine.electricCostPerTempPerDay * temp;
      totalProfit += calculateDailyProfit(machine, temp);
    });
  });

  return { totalRevenue, totalRent, totalElectricity, totalProfit };
};

export const aggregateSalesByLocation = (machines: Machine[]) => {
  const result: Record<string, number> = {
    SCHOOL: 0,
    "SHOPPING MALL": 0,
    HOSPITAL: 0,
  };
  machines.forEach((m) => {
    result[m.locationType] += m.expectedSalesPerDay;
  });
  return result;
};
