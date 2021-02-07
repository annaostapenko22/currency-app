import React, { useState } from "react";
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

import { data } from "../../default";
import MultiCurrencySelect from "./multiCurrencySelect";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const notSelectedCurr = ["USD", "CHF"];
const HistoricalCarrencyChart = () => {
  const [notSelectedCurrencies, setNotSelectedCurrencies] = useState<any>(
    notSelectedCurr
  );

  const showSelectedCurrenciesInChart = () => {
    const res = data.map((item: any) => {
      const keys = Object.keys(item).filter(
        (item) => !notSelectedCurrencies.includes(item)
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
    setNotSelectedCurrencies(() => {
      return notSelectedCurr.filter((item: any) => !currencies.includes(item));
    });
  };
  return (
    <Wrapper>
      <LineChart
        width={950}
        height={350}
        data={showSelectedCurrenciesInChart()}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="CHF" stroke="#8884d8" />
        <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
        <Line type="monotone" dataKey="EUR" stroke="#090b70" />
      </LineChart>
      <MultiCurrencySelect handleSelect={handleSelect} />
    </Wrapper>
  );
};

export default HistoricalCarrencyChart;
