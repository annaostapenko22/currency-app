import styled from "styled-components";

export const ConverterWrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-around;
`;

export const ConverterInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 70px;
  justify-content: space-around;
`;

export const Input = styled.input`
padding: 5px;
border-radius: 5px;
border: 1px solid #ccc;
`

export const Select = styled.select`
 padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`