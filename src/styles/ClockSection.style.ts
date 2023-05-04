import styled from "styled-components";

// App.tsx의 Grid의 아이템
export const ClockLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  //grid position
  grid-row: 1 / 2;

  .clock-date {
    font-size: 30px;
  }

  .clock-time {
    margin-top: 10px;
    font-size: 60px;
    font-weight: 800;
  }
`;
