import React, { FC } from "react";

// components
import ConverterSelectOption from "./converterSelectOption";

// interfaces
import { ConverterSelectProps } from "../interfaces";

// enums
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
