import { useState, useEffect, useContext } from "react";
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
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  color: rgba(255, 255, 255, 0.8);

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
      grid-row: 1 / 3;
      margin-top: 40px;
    }

    &:nth-child(2) {
      grid-row: 1 / 4;
      /* background-color: teal; */
    }
    &:nth-child(3) {
      /* background-color: green; */
      grid-row: 3 / -1;
      margin-top: 40px;
    }
    &:nth-child(4) {
      /* background-color: purple; */
      grid-row: 4 / -1;
      margin-top: -30px;
    }
  }
`;

const GridItem = styled.div`
  position: relative;

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

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: absolute;
  top: 10%;
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const Seperator = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80%;
  margin-top: 70px;
  /* background-color: teal; */
`;

const ScheduleRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  color: rgba(255, 255, 255, 0.8);
  justify-content: space-between;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  gap: 10px;
  span {
    font-size: 24px;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: -10px;
`;

const PhotoRow = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: space-evenly;
  /* background-color: teal; */
`;

const PhotoBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoItem = styled.img`
  width: 160px;
  height: 160px;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(35.95);
  const [longitude, setLongitude] = useState(126.71);
  const [forecasts, setForecasts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [koreanTime, setKoreanTime] = useState();
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
                  <SubTitleContainer className="weather">
                    <SubTitle>군산</SubTitle>
                    <Seperator />
                  </SubTitleContainer>
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
                <GridItem className="item">
                  <SubTitleContainer className="schedule">
                    <SubTitle>우리 일정!</SubTitle>
                    <Seperator />
                  </SubTitleContainer>
                  <ScheduleContainer>
                    {schedules !== null ? (
                      schedules.map((c, i) => (
                        <ScheduleRow key={i}>
                          <ScheduleItem>
                            <Text>{`${new Date(
                              c.date.seconds * 1000
                            ).getFullYear()}-${
                              new Date(c.date.seconds * 1000).getMonth() + 1
                            }-${new Date(
                              c.date.seconds * 1000
                            ).getDate()}`}</Text>
                          </ScheduleItem>
                          <ScheduleItem>
                            <Text>{c.name}</Text>
                          </ScheduleItem>
                        </ScheduleRow>
                      ))
                    ) : (
                      <ScheduleRow>
                        <ScheduleItem>
                          <Text>일정 없음!</Text>
                        </ScheduleItem>
                      </ScheduleRow>
                    )}
                  </ScheduleContainer>
                </GridItem>
                <GridItem className="item">
                  <SubTitleContainer className="weekly">
                    <SubTitle>RUZA's PICK</SubTitle>
                    <Seperator />
                    <PhotoContainer>
                      <PhotoRow>
                        <PhotoBox>
                          <PhotoItem src={gallery[0]} />
                        </PhotoBox>
                        <PhotoBox>
                          <PhotoItem src={gallery[1]} />
                        </PhotoBox>
                      </PhotoRow>
                    </PhotoContainer>
                  </SubTitleContainer>
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
