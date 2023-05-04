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
`;
