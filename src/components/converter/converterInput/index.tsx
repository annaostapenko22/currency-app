import { FC } from "react";
import { ConverterInputProps } from "../interfaces";

// styles
import { Input } from "../ui";

const ConverterInput: FC<ConverterInputProps> = ({
  handleInputChange,
  name,
  value,
}) => {
  return (
    <Input
      onChange={handleInputChange}
      name={name}
      value={value}
    ></Input>
  );
};

export default ConverterInput;
