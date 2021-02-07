import { FC } from "react";

interface ConverterSelectOptionProps {
  value: string;
}

const ConverterSelectOption: FC<ConverterSelectOptionProps> = ({ value }) => (
  <option>{value}</option>
);

export default ConverterSelectOption;
