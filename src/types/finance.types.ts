export interface FinanceSummary {
  totalBalance: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  profit: number;
  revenueGrowth: number;  // percentage
  expensesGrowth: number; // percentage
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  expenses: number;
}

export interface ClientGrowthData {
  month: string;
  clients: number;
}
