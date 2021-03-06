import {
  HistoricalCurrency,
  LiveCurrencyConvertedData,
} from "../components/converter/interfaces";

export type LiveCurrencyResponse = any;

const convertFromOneToAnotherCurrencyThroughUSD = (
  fromCurrencyValue: number,
  toCurrencyValue: number
) => {
  const fromCurrencyInUSD = 1 / fromCurrencyValue;
  const toCurrencyInUSD = 1 / toCurrencyValue;
  return fromCurrencyInUSD / toCurrencyInUSD;
};

const liveCurrenciesResponseConverter = async (
  liveCurrenciesResponse: LiveCurrencyResponse
) => {
  const givenCurrency = liveCurrenciesResponse.source;

  const currencies: LiveCurrencyConvertedData<HistoricalCurrency> = {
    [givenCurrency]: {} as HistoricalCurrency,
  } as LiveCurrencyConvertedData<HistoricalCurrency>;

  for (let key in liveCurrenciesResponse.quotes) {
    const convertedCurrency = key.slice(3);
    currencies[givenCurrency][convertedCurrency] =
      liveCurrenciesResponse.quotes[key];
  }

  for (let currency in currencies[givenCurrency]) {
    if (!currencies[currency]) {
      for (let innerCurrency in currencies[givenCurrency]) {
        if (!currencies[currency]) {
          currencies[currency] = {} as HistoricalCurrency;
        }

        if (currency === innerCurrency) {
          currencies[currency][innerCurrency] = 1;
          continue;
        }

        currencies[currency][
          innerCurrency
        ] = convertFromOneToAnotherCurrencyThroughUSD(
          currencies[givenCurrency][currency],
          currencies[givenCurrency][innerCurrency]
        );
      }
    }
  }
  return currencies;
};

export {
  liveCurrenciesResponseConverter,
  convertFromOneToAnotherCurrencyThroughUSD,
};
