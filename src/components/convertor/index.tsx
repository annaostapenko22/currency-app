import React, { FC, ChangeEvent, useState, useCallback } from "react";
import ConverterInput from "./converterInput";
import ConverterSelect from "./converterSelect";
import { ConverterInnerWrapper, ConverterWrapper } from "./ui";
import { currencyData } from "../../default";

interface initialInputState {
  i1: string;
  i2: string;
}
interface initialSelectState {
  s1: string;
  s2: string;
}
interface ConverterProps {
  liveCurrencyConverterData: any
}
const Converter: FC<ConverterProps> = ({liveCurrencyConverterData}) => {
  console.log("liveCurrencyConverterData", liveCurrencyConverterData);
  console.log("currencyData", currencyData);
  const [input, setInput] = useState<initialInputState>({
    i1: "",
    i2: "",
  });
  const [select, setSelect] = useState<initialSelectState>({
    s1: "EUR",
    s2: "USD",
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log("value", value);
      if (name === "i1") {
        setInput({
          i1: value,
          i2: (
            liveCurrencyConverterData[select.s1][select.s2] * parseFloat(value)
          ).toString(),
        });
      } else {
        setInput({
          i1: (
            liveCurrencyConverterData[select.s2][select.s1] * parseFloat(value)
          ).toString(),
          i2: value,
        });
      }
    },
    [select.s2, select.s1, input, liveCurrencyConverterData]
  );

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setSelect((prevState) => ({ ...prevState, [name]: value }));
      if (name === "s1") {
        const convertedCurrencyValue =
          select.s2 === value
            ? input.i1
            : liveCurrencyConverterData[value][select.s2] * parseFloat(input.i1);
        setInput({
          ...input,
          i2: convertedCurrencyValue.toString(),
        });
      } else {
        const givenCurrencyValue =
          select.s1 === value
            ? input.i2
            : liveCurrencyConverterData[value][select.s1] * parseFloat(input.i2);
        setInput({
          ...input,
          i1: givenCurrencyValue.toString(),
        });
      }
    },
    [input, select]
  );
  return (
    <ConverterWrapper>
      <ConverterInnerWrapper>
        <ConverterInput
          handleInputChange={handleInputChange}
          name="i1"
          value={input.i1}
          disabled={false}
        />
        <ConverterInput
          handleInputChange={handleInputChange}
          name="i2"
          value={input.i2}
          disabled={false}
        />
      </ConverterInnerWrapper>
      <ConverterInnerWrapper>
        <ConverterSelect
          handleSelectChange={handleSelectChange}
          name="s1"
          selected="EUR"
        />
        <ConverterSelect
          handleSelectChange={handleSelectChange}
          name="s2"
          selected="USD"
        />
      </ConverterInnerWrapper>
    </ConverterWrapper>
  );
};

export default Converter;
