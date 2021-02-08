import React, { useEffect, useState } from "react";
import Converter from "./components/convertor";
import CurrencyLayerClient from "currencylayer-client";
import styled from "styled-components";
import HistoricalCurrencyChart from "./components/historicalCurrencyChart";
import {
  liveCurrenciesResponseConverter,
  convertFromOneToAnotherCurrencyThroughUSD,
} from "./helpers/converter";
import moment from "moment";
const MainWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

let client = new CurrencyLayerClient({
  apiKey: "2c40bc109796df0b9aaecf2c1c16edc7",
});

const App = () => {
  const [data, setdata] = useState<any>([]);
  const [
    liveCurrencyConverterData,
    setliveCurrencyConverterData,
  ] = useState<any>({});
  useEffect(() => {
    const currentDay = moment().format("YYYY-MM-DD");
    const setLiveCurrenciesResponse = async () => {
      const liveCurrenciesResponse = await client.live({
        currencies: "CHF, USD, EUR",
      });
      const liveCurrencyData = await liveCurrenciesResponseConverter(
        liveCurrenciesResponse
      );
      setliveCurrencyConverterData(liveCurrencyData);
      const twoWeekCurrencyData = await collectHistoricalData(14);
      setdata(twoWeekCurrencyData);
    };

    setLiveCurrenciesResponse();
  }, []);

  const createDateStringsArrayFromToday = (daysAmount: number) => {
    const currentDay = moment();
    const dateStrings = [currentDay.format("YYYY-MM-DD")];
    for (let i = 1; i < daysAmount; i++) {
      const date = currentDay.subtract(1, "d").format("YYYY-MM-DD");
      dateStrings.push(date);
    }
    return dateStrings;
  };

  const getDataFromLocalStorage = (key: string) => {
    const keyValue = localStorage.getItem(key);
    return keyValue ? JSON.parse(keyValue) : null;
  }

  const setDataToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getDateCurrencyConversionFromCache = (date: string) => getDataFromLocalStorage(date);
  

  const setDateCurrencyConversionToCache = (date: string, dateCurrencyConversion: any) => {
    setDataToLocalStorage(date, dateCurrencyConversion);
  }

  const collectHistoricalData = async (daysAmount: number) => {
    const collectedData = [];
    const dateStrings = createDateStringsArrayFromToday(daysAmount);
    for (let date of dateStrings) {
      let dateCurrencyConversion = getDateCurrencyConversionFromCache(date);

      if (!dateCurrencyConversion) {
        dateCurrencyConversion = await client.historical({
          date: date,
          currencies: "CHF, USD, EUR",
        });
        setDateCurrencyConversionToCache(date, dateCurrencyConversion);
      }

      const currenciesInUSD: any = {};
      for (let key in dateCurrencyConversion.quotes) {
        const convertedCurrency = key.slice(3);
        currenciesInUSD[convertedCurrency] = dateCurrencyConversion.quotes[key];
      }

      const currenciesInEUR: any = {};
      for (let key in currenciesInUSD) {
        if (key === "EUR") {
          currenciesInEUR[key] = 1;
        } else {
          const currencyValue = convertFromOneToAnotherCurrencyThroughUSD(
            currenciesInUSD[key],
            currenciesInUSD["EUR"]
          );
          currenciesInEUR[key] = currencyValue;
        }
      }

      collectedData.push({ date, ...currenciesInEUR });
    }
    return collectedData;
  };

  return (
    <MainWrapper>
      <h1>Currrency app</h1>
      <p>Current currencies in Euro</p>
      <p>CHF:</p>
      <p>USD:</p>
      <Converter liveCurrencyConverterData={liveCurrencyConverterData} />
      <HistoricalCurrencyChart data={data} />
    </MainWrapper>
  );
};

export default App;
