import React, { useEffect, useState, FC } from "react";

// interfaces
import { MultiCurrencySelectProps, ChartOption } from "../interfaces";

// styles
import { CurrencyMultiSelect } from "../ui";

const allitemSelected = {
  allItemsAreSelected: "CHF 🍫 USD 🗽",
};

const options: ChartOption[] = [
  { label: "CHF 🍫", value: "CHF" },
  { label: "USD 🗽", value: "USD" },
];

const MultiCurrencySelect: FC<MultiCurrencySelectProps> = ({
  changeChartDisplayedFields,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<ChartOption[]>([]);

  useEffect(() => {
    const currencies = selectedOptions.map((item: ChartOption) => item.value);
    changeChartDisplayedFields(currencies);
  }, [selectedOptions, changeChartDisplayedFields]);

  return (
    <CurrencyMultiSelect
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
      labelledBy={"Select"}
      hasSelectAll={false}
      disableSearch={true}
      overrideStrings={allitemSelected}
    />
  );
};

export default MultiCurrencySelect;
