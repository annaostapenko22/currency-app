import { ChangeEvent } from "react";

export interface KeyValueAccess<V> {
  [key: string]: V
} 

export interface Currencies {
  CHF: number;
  USD: number;
  EUR: number;
}

export interface HistoricalCurrency extends Currencies, KeyValueAccess<number> {}

export interface LiveCurrencyConvertedData<T extends HistoricalCurrency> extends KeyValueAccess<HistoricalCurrency> {
  CHF: T;
  USD: T;
  EUR: T;
}

export interface ConverterSelectProps {
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  selected: string;
}

export interface ConverterInputProps {
  name: string;
  value: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface initialInputState {
  givenCurrencyInput: string;
  convertedCurrencyInput: string;
}

export interface initialSelectState {
  givenCurrencySelect: string;
  convertedCurrencySelect: string;
}

export interface ConverterSelectOptionProps {
  value: string;
}
