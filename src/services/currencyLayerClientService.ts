import CurrencyLayerClient from "currencylayer-client";

let client = new CurrencyLayerClient({
  apiKey: process.env.REACT_APP_CURRENCY_LAYER_CLIENT_API_KEY,
});

export { client };
