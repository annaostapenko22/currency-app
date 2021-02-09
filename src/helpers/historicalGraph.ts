import moment from "moment";

import {convertFromOneToAnotherCurrencyThroughUSD} from "./converter"
import {client} from "../services/currencyLayerClientService"
import {BASE_CURRENCY, CURRENCIES} from "../helpers/constants";


interface CurrenciesInUSD {
  USD: number;
  CHF: number;
  EUR: number
}

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
        console.log("date=>", date)
        dateCurrencyConversion = await client.historical({
          date: date,
          currencies: CURRENCIES,
        });
        setDateCurrencyConversionToCache(date, dateCurrencyConversion);
      }

      const currenciesInUSD: any = {};
      for (let key in dateCurrencyConversion.quotes) {
        const convertedCurrency = key.slice(3);
        currenciesInUSD[convertedCurrency] = dateCurrencyConversion.quotes[key];
      }
console.log("currenciesInUSD", currenciesInUSD)
      const currenciesInEUR: any = {};
      for (let key in currenciesInUSD) {
        if (key === BASE_CURRENCY) {
          currenciesInEUR[key] = 1;
        } else {
          const currencyValue = convertFromOneToAnotherCurrencyThroughUSD(
            currenciesInUSD[key],
            currenciesInUSD[BASE_CURRENCY]
          );
          currenciesInEUR[key] = currencyValue;
        }
      }

      collectedData.push({ date, ...currenciesInEUR });
    }
    return collectedData;
  };

  export   {
    collectHistoricalData
  }