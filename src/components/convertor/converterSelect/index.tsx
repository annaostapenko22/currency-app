import React, { FC } from "react";
import { ConvertorSelectProps } from "../interfaces";
import ConverterSelectOption from "./converterSelectOption"
import styled from "styled-components";

const Select = styled.select`
 padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const ConvertorSelect: FC<ConvertorSelectProps> = ({
  handleSelectChange,
  name,
  selected,
}) => {
  return (
    <Select name={name} onChange={handleSelectChange} defaultValue={selected}>
      <ConverterSelectOption value={"EUR"}/>
      <ConverterSelectOption value={"CHF"}/>
      <ConverterSelectOption value={"USD"}/>
    </Select>
  );
};

export default ConvertorSelect;
