import React, { ChangeEvent, useState, useCallback, useEffect } from "react";
import ConverterInput from "./converterInput";
import ConverterSelect from "./converterSelect";

// styles
import { ConverterInnerWrapper, ConverterWrapper } from "./ui";

// interfaces
import {
  initialSelectState,
  initialInputState,
  HistoricalCurrency,
  LiveCurrencyConvertedData,
} from "./interfaces";

import { currencyNames } from "../../enums/currencyNames";
import { liveCurrenciesResponseConverter } from "../../helpers/converter";
import { client } from "../../services/currencyLayerClientService";

import { CURRENCIES } from "../../helpers/constants";

const Converter = () => {
  const [liveCurrencyConverterData, setliveCurrencyConverterData] = useState<
    LiveCurrencyConvertedData<HistoricalCurrency>
  >({} as LiveCurrencyConvertedData<HistoricalCurrency>);
  useEffect(() => {
    const setLiveCurrenciesResponse = async () => {
      const liveCurrenciesResponse = await client.live({
        currencies: CURRENCIES,
      });
      const liveCurrencyData = await liveCurrenciesResponseConverter(
        liveCurrenciesResponse
      );
      setliveCurrencyConverterData(liveCurrencyData);
    };

    setLiveCurrenciesResponse();
  }, []);
  const [conversionInputs, setConversionInputs] = useState<initialInputState>({
    givenCurrencyInput: "",
    convertedCurrencyInput: "",
  });

  const [currencySelects, setCurrencySelects] = useState<initialSelectState>({
    givenCurrencySelect: currencyNames.EUR,
    convertedCurrencySelect: currencyNames.USD,
  });

  const countConversionValue = useCallback(
    (givenCurrency, convertedCurrency, value) =>
      (
        liveCurrencyConverterData[givenCurrency][convertedCurrency] *
        parseFloat(value)
      ).toString(),
    [liveCurrencyConverterData]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const { givenCurrencySelect, convertedCurrencySelect } = currencySelects;
      if (!value) {
        setConversionInputs({
          givenCurrencyInput: "",
          convertedCurrencyInput: "",
        });
      } else {
        if (name === "givenCurrencyInput") {
          setConversionInputs({
            givenCurrencyInput: value,
            convertedCurrencyInput: countConversionValue(
              givenCurrencySelect,
              convertedCurrencySelect,
              value
            ),
          });
        } else {
          setConversionInputs({
            givenCurrencyInput: countConversionValue(
              convertedCurrencySelect,
              givenCurrencySelect,
              value
            ),
            convertedCurrencyInput: value,
          });
        }
      }
    },
    [currencySelects, countConversionValue]
  );

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrencySelects((prevState) => ({ ...prevState, [name]: value }));
      if (name === "convertedCurrencySelect") {
        const convertedCurrencyValue =
          currencySelects.convertedCurrencySelect === value
            ? conversionInputs.givenCurrencyInput
            : liveCurrencyConverterData[value][
                currencySelects.convertedCurrencySelect
              ] * parseFloat(conversionInputs.givenCurrencyInput);
        setConversionInputs({
          ...conversionInputs,
          convertedCurrencyInput: convertedCurrencyValue.toString(),
        });
      } else {
        const givenCurrencyValue =
          currencySelects.givenCurrencySelect === value
            ? conversionInputs.convertedCurrencyInput
            : liveCurrencyConverterData[value][
                currencySelects.givenCurrencySelect
              ] * parseFloat(conversionInputs.convertedCurrencyInput);
        setConversionInputs({
          ...conversionInputs,
          givenCurrencyInput: givenCurrencyValue.toString(),
        });
      }
    },
    [conversionInputs, currencySelects, liveCurrencyConverterData]
  );
  return (
    <ConverterWrapper>
      <ConverterInnerWrapper>
        <ConverterInput
          handleInputChange={handleInputChange}
          name="givenCurrencyInput"
          value={conversionInputs.givenCurrencyInput}
        />
        <ConverterInput
          handleInputChange={handleInputChange}
          name="convertedCurrencyInput"
          value={conversionInputs.convertedCurrencyInput}
        />
      </ConverterInnerWrapper>
      <ConverterInnerWrapper>
        <ConverterSelect
          handleSelectChange={handleSelectChange}
          name="givenCurrencySelect"
          selected={currencyNames.EUR}
        />
        <ConverterSelect
          handleSelectChange={handleSelectChange}
          name="convertedCurrencySelect"
          selected={currencyNames.USD}
        />
      </ConverterInnerWrapper>
    </ConverterWrapper>
  );
};

export default Converter;
