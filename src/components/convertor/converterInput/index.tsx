import { FC } from "react";
import { ConvertorInputProps } from "../interfaces";
import styled from "styled-components";

const Input = styled.input`
padding: 5px;
border-radius: 5px;
border: 1px solid #ccc;
`
const ConvertorInput: FC<ConvertorInputProps> = ({
  handleInputChange,
  name,
  value,
  disabled,
}) => {
  console.log("VAL", value)
  const parsedValue = parseFloat(value)
  return (
    <Input
      onChange={handleInputChange}
      name={name}
      value={!isNaN(parsedValue) ? value : ""}
      disabled={disabled}
    ></Input>
  );
};

export default ConvertorInput;
