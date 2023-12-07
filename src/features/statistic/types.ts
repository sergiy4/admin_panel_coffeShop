export interface OverallStatistic {
  yearlyData: {
    year: number;
    totalSales: number;
    totalUnits: number;
  }[];
  monthlyData: {
    month: number;
    totalSales: number;
    totalUnits: number;
  }[];
  dailyData: {
    date: Date;
    totalSales: number;
    totalUnits: number;
  };
}

export interface CurrentProductStatistic extends OverallStatistic {
  productID: string;
}
