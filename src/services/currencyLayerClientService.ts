import CurrencyLayerClient from "currencylayer-client";

import { CURRENCIES } from "../helpers/constants";

let client = new CurrencyLayerClient({
  apiKey: process.env.REACT_APP_CURRENCY_LAYER_CLIENT_API_KEY,
});

const getHistoricalDataByDate = (date: string) =>
  client.historical({
    date,
    currencies: CURRENCIES,
  });

const getLiveCurrenciesConversion = () =>
  client.live({
    currencies: CURRENCIES,
  });

export { getHistoricalDataByDate, getLiveCurrenciesConversion };
