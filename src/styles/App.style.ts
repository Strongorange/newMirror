import styled from "styled-components";

export const Outter = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  /* width: 1024px;
  height: 600px; */
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
`;

export const Text = styled.span``;

export const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  color: rgba(255, 255, 255, 0.8);

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &:nth-child(1) {
      grid-row: 1 / 2;
    }

    &:nth-child(2) {
      grid-row: 1 / 2;
    }
    &:nth-child(3) {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
  }
`;

export const GridItem = styled.div`
  position: relative;

  &.photo {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    gap: 5px;
  }

  .clock-date {
    font-size: 30px;
  }

  .clock-time {
    margin-top: 10px;
    font-size: 60px;
    font-weight: 800;
  }

  .weather {
    align-items: flex-end;
  }

  .schedule {
    align-items: flex-start;
  }

  .weekly {
    align-items: flex-end;
  }
`;

export const PhotoWrapper = styled.div`
  display: flex;
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

export const PhotoBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;

  @supports (aspect-ratop: 1/1) {
    aspect-ratio: 1/1;
    padding-bottom: 0;
  }
`;

export const PhotoItem = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
