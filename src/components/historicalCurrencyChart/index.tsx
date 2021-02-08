import React, { FC, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import styled from "styled-components";

// import { data } from "../../default";
import MultiCurrencySelect from "./multiCurrencySelect";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
interface HistoricalCarrencyChartProps {
  data: any;
}
const HistoricalCarrencyChart: FC<HistoricalCarrencyChartProps> = ({data}) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<any>(
    []
  );

  const showSelectedCurrenciesInChart = () => {
    const res = data.map((item: any) => {
      const keys = Object.keys(item).filter(
        (item) => selectedCurrencies.includes(item)
      );
      const obj: any = {};
      for (let key in item) {
        if (keys.includes(key)) {
          obj[key] = item[key];
        }
      }
      return obj;
    });
    return res;
  };

  const handleSelect = (currencies: any) => {
    setSelectedCurrencies([...currencies, "EUR", "date"])}
  return (
    <Wrapper>
      <LineChart
        width={950}
        height={370}
        data={showSelectedCurrenciesInChart()}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={12}/>
        <YAxis domain={[0.75, 'auto']}/>
        <Tooltip />
        <Legend height={10}/>
        <Line type="monotone" dataKey="CHF" stroke="#ee328a" />
        <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
        <Line type="monotone" dataKey="EUR" stroke="#090b70" />
      </LineChart>
      <MultiCurrencySelect handleSelect={handleSelect} />
    </Wrapper>
  );
};

export default HistoricalCarrencyChart;
