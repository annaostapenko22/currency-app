import React, { FC } from "react";
import { ConverterSelectProps } from "../interfaces";
import ConverterSelectOption from "./converterSelectOption";
import { currencyNames } from "../../../enums/currencyNames";

// styles
import { Select } from "../ui";

const ConverterSelect: FC<ConverterSelectProps> = ({
  handleSelectChange,
  name,
  selected,
}) => {
  return (
    <Select name={name} onChange={handleSelectChange} defaultValue={selected}>
      <ConverterSelectOption value={currencyNames.EUR} />
      <ConverterSelectOption value={currencyNames.CHF} />
      <ConverterSelectOption value={currencyNames.USD} />
    </Select>
  );
};

export default ConverterSelect;
