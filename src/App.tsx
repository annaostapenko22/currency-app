import React, { useEffect } from "react";
import Converter from "./components/convertor";
import CurrencyLayerClient from "currencylayer-client";
import styled from "styled-components";
import HistoricalCurrencyChart from "./components/historicalCurrencyChart";

const MainWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;


function App() {

  return (
    <MainWrapper>
      <h1>Currrency app</h1>
      <p>Current Euro:</p>
      <p>CHF:</p>
      <p>USD:</p>
      <Converter />
      <HistoricalCurrencyChart />
    </MainWrapper>
  );
}

export default App;
