import React, { useCallback, useEffect, useState } from "react";

// components
import MultiCurrencySelect from "./multiCurrencySelect";
import Chart from "./chart.tsx";

// styles
import { Wrapper } from "./ui";

// interfaces
import { HistoricalCurrencyDate } from "./interfaces";

// helpers
import { collectHistoricalData } from "../../helpers/historicalGraph";
import { DAYS_AMOUNT_FOR_HISTORICAL_CHART } from "../../helpers/constants";

const HistoricalCarrencyChart = () => {
  const [chartDisplayedFields, setChartDisplayedFields] = useState<string[]>([]);
  const [historicalChartData, setHistoricalChartData] = useState<
    HistoricalCurrencyDate[]
  >([]);

  useEffect(() => {
    const setHistoricalChartResponse = async () => {
      const currencyData = await collectHistoricalData(
        DAYS_AMOUNT_FOR_HISTORICAL_CHART
      );
      setHistoricalChartData(currencyData);
    };

    setHistoricalChartResponse();
  }, []);

  const changeChartDisplayedFields = useCallback((currencies: string[]) => {
    setChartDisplayedFields([...currencies, "EUR", "date"]);
  }, []);
  console.log("chartDisplayedFields===>", chartDisplayedFields);
  return (
    <Wrapper>
      <MultiCurrencySelect
        changeChartDisplayedFields={changeChartDisplayedFields}
      />
      <Chart
        historicalChartData={historicalChartData}
        selectedCurrencies={chartDisplayedFields}
      />
    </Wrapper>
  );
};

export default HistoricalCarrencyChart;
