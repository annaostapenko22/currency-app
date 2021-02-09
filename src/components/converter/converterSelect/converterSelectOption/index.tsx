import { FC } from "react";

// interfaces
import {ConverterSelectOptionProps} from "../../interfaces"

const ConverterSelectOption: FC<ConverterSelectOptionProps> = ({ value }) => (
  <option>{value}</option>
);

export default ConverterSelectOption;
