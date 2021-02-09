import styled from "styled-components";

const MainWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  font-family: sans-serif;
`;

const DashboardTile = styled.div`
  position: relative;
  border: 1px solid #ccc;
  padding: 15px;
  padding-top: 70px;
  margin: 15px 0;
  border-radius: 5px;
`;

const DashboardTileTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 15px);
  background-color: #123;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

export { MainWrapper, DashboardTile, DashboardTileTitle };
