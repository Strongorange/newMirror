import { useState, useEffect } from "react";
import styled from "styled-components";
import { firestore } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Clock from "react-live-clock";
import { WaterOutline, SunnyOutline } from "react-ionicons";
import Message from "./Message";

const Outter = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
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

const Text = styled.span``;

const GridContainer = styled.div`
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

const GridItem = styled.div`
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

const PhotoWrapper = styled.div`
  display: flex;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const WeatherRow = styled.div`
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

const WeatherItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

const WeatherIcon = styled.img`
  width: 85px;
  height: 100px;
`;

const PhotoBox = styled.div`
  width: 100%;
  height: 100%;
`;

const PhotoItem = styled.img`
  width: 100%;
  height: 100%;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(35.95);
  const [longitude, setLongitude] = useState(126.71);
  const [forecasts, setForecasts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [APIKEY, setAPIKEY] = useState(process.env.REACT_APP_APIKEY);

  const getWeather = async () => {
    setIsLoading((state) => (state = true));
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts,minutely,hourly&appid=${APIKEY}&lang=kr`
    ).then((res) => res.json());
    setForecasts((state) => (state = response));
    setTimeout(() => setIsLoading((state) => (state = false)), 3000);
    console.log("weather active");
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "mirror", "message"), (doc) => {
      console.log("Current data: ", doc.data());
      setMessages(doc.data());
    });
    onSnapshot(doc(firestore, "mirror", "schedules"), (doc) => {
      console.log("Current schedules: ", doc.data());
      setSchedules(doc.data().schedule);
    });
    onSnapshot(doc(firestore, "mirror", "gallery"), (doc) => {
      console.log("Current Gallery: ", doc.data());
      setGallery(doc.data().photos);
    });
    getWeather();
    let interval = setInterval(() => getWeather(), 1800000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log(schedules);
  }, [schedules]);

  useEffect(() => {
    // console.log(gallery);
  }, [gallery]);

  useEffect(() => {
    setIsLoading((state) => true);
    setTimeout(() => setIsLoading((state) => false), 1000);
  }, [messages]);

  return (
    <>
      <Outter>
        <Container>
          {isLoading ? (
            <Text>노루를 데려오는 중</Text>
          ) : (
            <>
              <Message
                forecasts={forecasts.current.weather[0].main}
                messages={messages}
              />
              <GridContainer>
                <GridItem className="item">
                  <Clock
                    format={`ddd, YYYY년 M월, D일`}
                    locale="ko"
                    timezone="Asia/Seoul"
                    className="clock-date"
                    style={{ marginBottom: "20px" }}
                  />
                  <Clock
                    format={"hh:mm:ss"}
                    interval={100}
                    timezone={"Asia/Seoul"}
                    ticking={true}
                    className="clock-time"
                  />
                </GridItem>
                <GridItem className="item">
                  <WeatherContainer>
                    <WeatherRow>
                      <WeatherItem>
                        <WaterOutline
                          color={"#ababc8"}
                          height="25px"
                          width="25px"
                        />
                        <Text>{`${forecasts.current.humidity}`}%</Text>
                      </WeatherItem>
                      <WeatherItem>
                        <SunnyOutline
                          color={"#ababc8"}
                          title={"uvi"}
                          height="30px"
                          width="35px"
                        />
                        <Text>{` ${forecasts.current.uvi}`}</Text>
                      </WeatherItem>
                    </WeatherRow>
                    <WeatherRow>
                      <WeatherItem>
                        <WeatherIcon
                          src={`http://openweathermap.org/img/wn/${forecasts.current.weather[0].icon}@2x.png`}
                        />
                        <Text>{`${forecasts.current.temp}°C`}</Text>
                      </WeatherItem>
                    </WeatherRow>
                    <WeatherRow>
                      <WeatherItem>
                        <Text>체감온도</Text>
                        <Text>{`${forecasts.current.feels_like}°C`}</Text>
                      </WeatherItem>
                    </WeatherRow>
                  </WeatherContainer>
                </GridItem>
                <GridItem className="item photo">
                  <PhotoBox>
                    <PhotoItem src={gallery[0]} />
                  </PhotoBox>
                  <PhotoBox>
                    <PhotoItem src={gallery[1]} />
                  </PhotoBox>
                  <PhotoBox>
                    <PhotoItem src={gallery[0]} />
                  </PhotoBox>
                  <PhotoBox>
                    <PhotoItem src={gallery[1]} />
                  </PhotoBox>
                </GridItem>
              </GridContainer>
            </>
          )}
        </Container>
      </Outter>
    </>
  );
}

export default App;
