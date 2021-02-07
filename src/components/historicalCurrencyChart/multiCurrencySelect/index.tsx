import React, {
  ChangeEvent,
  useEffect,
  useCallback,
  useState,
  FC,
} from "react";
import styled from "styled-components";
import { currencyData } from "../../../default";

import MultiSelect from "react-multi-select-component";

const Wrapper = styled(MultiSelect)`
  display: flex;
  flex-direction: column;
  width: 220px;
`;

interface MultiCurrencySelectProps {
  handleSelect: (currencies: any) => void;
}

const MultiCurrencySelect: FC<MultiCurrencySelectProps> = ({
  handleSelect,
}) => {
  const [selected, setSelected] = useState([]);
  const options: any = [
    { label: "CHF 🍫", value: "CHF" },
    { label: "USD 🗽", value: "USD" },
  ];

  const allitemSelected = {
    allItemsAreSelected: "CHF 🍫 USD 🗽",
  };

  useEffect(() => {
    const currencies = selected.map((item: any)=> item.value);
    console.log("currencies", currencies);
    handleSelect(currencies);
  }, [selected]);

  return (
    <Wrapper
      options={options}
      value={selected}
      onChange={setSelected}
      labelledBy={"Select"}
      hasSelectAll={false}
      disableSearch={true}
      overrideStrings={allitemSelected}
    />
  );
};

export default MultiCurrencySelect;
