import React, { ChangeEvent, useState, useCallback, useEffect } from "react";

// components
import ConverterInput from "./converterInput";
import ConverterSelect from "./converterSelect";

// styles
import { ConverterInnerWrapper, ConverterWrapper } from "./ui";

// interfaces
import {
  InitialSelectState,
  InitialInputState,
  HistoricalCurrency,
  LiveCurrencyConvertedData,
} from "./interfaces";

// helpers
import { liveCurrenciesResponseConverter } from "../../helpers/converter";

// enums
import { currencyNames } from "../../enums/currencyNames";

// services
import { getLiveCurrenciesConversion } from "../../services/currencyLayerClientService";

const Converter = () => {
  const [liveCurrencyConverterData, setliveCurrencyConverterData] = useState<
    LiveCurrencyConvertedData<HistoricalCurrency>
  >({} as LiveCurrencyConvertedData<HistoricalCurrency>);
  useEffect(() => {
    const setLiveCurrenciesResponse = async () => {
      const liveCurrenciesResponse = await getLiveCurrenciesConversion();
      const liveCurrencyData = await liveCurrenciesResponseConverter(
        liveCurrenciesResponse
      );
      setliveCurrencyConverterData(liveCurrencyData);
    };

    setLiveCurrenciesResponse();
  }, []);
  const [conversionInputs, setConversionInputs] = useState<InitialInputState>({
    givenCurrencyInput: "",
    convertedCurrencyInput: "",
  });

  const [currencySelects, setCurrencySelects] = useState<InitialSelectState>({
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
      const { givenCurrencySelect, convertedCurrencySelect } = currencySelects;
      const { givenCurrencyInput, convertedCurrencyInput } = conversionInputs;

      setCurrencySelects((prevState) => ({ ...prevState, [name]: value }));
      if (!givenCurrencyInput) {
        setConversionInputs({
          givenCurrencyInput: "",
          convertedCurrencyInput: "",
        });
      } else {
        if (name === "convertedCurrencySelect") {
          setConversionInputs({
            ...conversionInputs,
            convertedCurrencyInput: countConversionValue(
              value,
              convertedCurrencySelect,
              givenCurrencyInput
            ),
          });
        } else {
          setConversionInputs({
            ...conversionInputs,
            givenCurrencyInput: countConversionValue(
              value,
              givenCurrencySelect,
              convertedCurrencyInput
            ),
          });
        }
      }
    },
    [conversionInputs, currencySelects, countConversionValue]
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
