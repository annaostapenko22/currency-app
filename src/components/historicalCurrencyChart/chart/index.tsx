import React, { FC, useCallback } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

// interfaces
import { ChartProps, HistoricalCurrencyDate } from "../interfaces";

const Chart: FC<ChartProps> = ({ historicalChartData, selectedCurrencies }) => {
  const showSelectedCurrenciesInChart = useCallback(
    () =>
      historicalChartData.map((currencyDate: HistoricalCurrencyDate) => {
        const currencyDataToDisplay: HistoricalCurrencyDate = {} as HistoricalCurrencyDate;

        for (let key in currencyDate) {
          if (selectedCurrencies.includes(key)) {
            const currencyKeyDisplaedValue =
              key === "date"
                ? currencyDate[key]
                : Number(currencyDate[key]).toFixed(2);
            currencyDataToDisplay[key] = currencyKeyDisplaedValue;
          }
        }

        return currencyDataToDisplay;
      }),
    [historicalChartData, selectedCurrencies]
  );

  return (
    <LineChart
      width={950}
      height={370}
      data={showSelectedCurrenciesInChart()}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" fontSize={12} />
      <YAxis domain={[0.75, "auto"]} />
      <Tooltip />
      <Legend height={10} />
      <Line type="monotone" dataKey="CHF" stroke="#ee328a" />
      <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
      <Line type="monotone" dataKey="EUR" stroke="#090b70" />
    </LineChart>
  );
};

export default Chart;
