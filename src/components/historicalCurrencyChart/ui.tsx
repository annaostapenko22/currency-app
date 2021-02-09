import styled from "styled-components";
import MultiSelect from "react-multi-select-component";

const CurrencyMultiSelect = styled(MultiSelect)`
  display: flex;
  flex-direction: column;
  width: 220px;
  padding-left: 70px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: space-between;
`;

export {
    Wrapper,
    CurrencyMultiSelect,
}