import { Currencies, KeyValueAccess } from "../converter/interfaces";

export interface MultiCurrencySelectProps {
  changeChartDisplayedFields: (currencies: string[]) => void;
}

export interface ChartOption {
  value: string;
  label: string;
}

export interface ChartProps {
  selectedCurrencies: string[];
  historicalChartData: HistoricalCurrencyDate[];
}

export interface HistoricalCurrencyDate extends Currencies, KeyValueAccess<number | string> {
  date: string;
}

export interface HistoricalCarrencyChartProps {
  historicalChartData: HistoricalCurrencyDate[];
}

