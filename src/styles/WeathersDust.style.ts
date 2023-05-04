import styled from "styled-components";

// App.tsx의 Grid의 아이템
export const DustLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;

export const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const WeatherRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  justify-content: space-evenly;
  &:nth-child(1) {
    /* background-color: brown; */
    span {
      font-size: 30px;
      margin-bottom: -40px;
    }
  }
  &:nth-child(2) {
    /* background-color: green; */
    span {
      font-size: 60px;
      font-weight: 800;
    }
    margin-bottom: -30px;
  }
  &:nth-child(3) {
    /* background-color: blue; */
  }
`;

export const WeatherItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

export const DustInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export const DustRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const WeatherIcon = styled.img`
  width: 85px;
  height: 100px;
`;

export const Text = styled.span``;
