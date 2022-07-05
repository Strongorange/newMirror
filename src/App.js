import { useState, useEffect } from "react";
import styled from "styled-components";
import { firestore } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Clock from "react-live-clock";

const Outter = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1024px;
  height: 600px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
`;

const Text = styled.span``;

const Message = styled.span`
  font-size: 60px;
`;

const GridContainer = styled.div`
  display: grid;
  width: 80%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:nth-child(2) {
      background-color: teal;
    }
    &:nth-child(3) {
      background-color: green;
    }
    &:nth-child(4) {
      background-color: purple;
    }
  }
`;

const GridItem = styled.div`
  background-color: tomato;
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const Seperator = styled.div`
  width: 70%;
  border: 1px solid rgba(255, 255, 255, 0.6);
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(35.95);
  const [longitude, setLongitude] = useState(126.71);
  const [APIKEY, setAPIKEY] = useState(process.env.REACT_APP_APIKEY);
  const [forecasts, setForecasts] = useState(null);
  const [messages, setMessages] = useState();
  const [koreanTime, setKoreanTime] = useState();

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts,minutely,hourly&appid=${APIKEY}&lang=kr`
    ).then((res) => res.json());
    setForecasts(response);
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "mirror", "message"), (doc) => {
      console.log("Current data: ", doc.data());
      setMessages(doc.data());
    });
    getWeather();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      <Outter>
        <Container>
          {isLoading ? (
            <Text>노루를 데려오는 중</Text>
          ) : (
            <Message>{messages.always[0]}</Message>
          )}
          <GridContainer>
            <GridItem>
              <Clock
                format={`YYYY년 M월, D일`}
                locale="ko"
                timezone="Asia/Seoul"
              />
              <Clock
                format={"hh:mm:ss"}
                interval={100}
                timezone={"Asia/Seoul"}
                ticking={true}
              />
            </GridItem>
            <GridItem>
              <SubTitle>2</SubTitle>
              <Seperator />
            </GridItem>
            <GridItem>
              <SubTitle>3</SubTitle>
              <Seperator />
            </GridItem>
            <GridItem>
              <SubTitle>4</SubTitle>
              <Seperator />
            </GridItem>
          </GridContainer>
        </Container>
      </Outter>
    </>
  );
}

export default App;
