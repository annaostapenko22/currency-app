import React from "react";

// components
import Converter from "./components/converter";
import HistoricalCurrencyChart from "./components/historicalCurrencyChart";

// styles
import { MainWrapper, DashboardTile, DashboardTileTitle } from "../src/ui";

const App = () => {
  return (
    <MainWrapper>
      <DashboardTile>
        <DashboardTileTitle>Live Currency Rate</DashboardTileTitle>
        <Converter />
      </DashboardTile>
      <DashboardTile>
        <DashboardTileTitle>Historical Currency Rate</DashboardTileTitle>
        <HistoricalCurrencyChart />
      </DashboardTile>
    </MainWrapper>
  );
};

export default App;
