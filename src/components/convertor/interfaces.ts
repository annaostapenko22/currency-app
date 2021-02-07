import { ChangeEvent } from "react";

export interface ConvertorSelectProps {
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  selected: string
}

export interface ConvertorInputProps {
  name: string;
  value: string;
  disabled: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
