import { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Clock from "react-live-clock";
import { WaterOutline, SunnyOutline } from "react-ionicons";
import Message from "./Message";
import * as S from "./styles/App.style";
import useSaveUserAgentWidthHeight from "./hooks/useSaveUserAgentandWidthHeight";
import getWeatherData from "./utils/getWeatherData";
import { getAirQualityIcon, getDustData } from "./utils/getDustData";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [forecasts, setForecasts] = useState(null);
  const [dustData, setDustData] = useState({
    gunsan: { airQuality: "", pm10Value: "", pm25Value: "" },
    kimje: { airQuality: "", pm10Value: "", pm25Value: "" },
  });
  const [messages, setMessages] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [gallery, setGallery] = useState(null);

  useSaveUserAgentWidthHeight();

  const getWeatherAndDust = async () => {
    setIsLoading(true);

    try {
      const weatherDataPromise = getWeatherData();
      const dustDataGunsanPromise = getDustData(true);
      const dustDataKimjePromise = getDustData(false);

      const [weatherData, dustDataGunsan, dustDataKimje] = await Promise.all([
        weatherDataPromise,
        dustDataGunsanPromise,
        dustDataKimjePromise,
      ]);

      setForecasts(weatherData);
      setDustData({
        gunsan: dustDataGunsan,
        kimje: dustDataKimje,
      });
    } catch (error) {
      console.log("날씨, 먼지 데이터 가져오기에서 오류 발생 : \n", error);
    } finally {
      setTimeout(() => setIsLoading(false), 4000);
      // console.log("weather active");
    }
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "mirror", "message"), (doc) => {
      // console.log("Current data: ", doc.data());
      setMessages(doc.data());
    });
    onSnapshot(doc(firestore, "mirror", "schedules"), (doc) => {
      // console.log("Current schedules: ", doc.data());
      setSchedules(doc.data().schedule);
    });
    onSnapshot(doc(firestore, "mirror", "gallery"), (doc) => {
      // console.log("Current Gallery: ", doc.data());
      setGallery(doc.data().photos);
    });
    getWeatherAndDust();
    let interval = setInterval(() => getWeatherAndDust(), 1800000);

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
      <S.Outter>
        <S.Container>
          {isLoading ? (
            <S.Text>노루를 데려오는 중</S.Text>
          ) : (
            <>
              <Message
                forecasts={forecasts.current.weather[0].main}
                messages={messages}
              />
              <S.GridContainer>
                <S.GridItem className="item">
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
                </S.GridItem>
                <S.GridItem className="item weather_dust">
                  <S.WeatherContainer>
                    <S.WeatherRow>
                      <S.WeatherItem>
                        <WaterOutline
                          color={"#ababc8"}
                          height="25px"
                          width="25px"
                        />
                        <S.Text>{`${forecasts.current.humidity}`}%</S.Text>
                      </S.WeatherItem>
                      <S.WeatherItem>
                        <SunnyOutline
                          color={"#ababc8"}
                          title={"uvi"}
                          height="30px"
                          width="35px"
                        />
                        <S.Text>{` ${forecasts.current.uvi}`}</S.Text>
                      </S.WeatherItem>
                    </S.WeatherRow>
                    <S.WeatherRow>
                      <S.WeatherItem>
                        <S.WeatherIcon
                          src={`http://openweathermap.org/img/wn/${forecasts.current.weather[0].icon}@2x.png`}
                        />
                        <S.Text>{`${forecasts.current.temp}°C`}</S.Text>
                      </S.WeatherItem>
                    </S.WeatherRow>
                    <S.WeatherRow>
                      <S.WeatherItem>
                        <S.Text>체감온도</S.Text>
                        <S.Text>{`${forecasts.current.feels_like}°C`}</S.Text>
                      </S.WeatherItem>
                    </S.WeatherRow>
                    <S.DustInfo id="airquality">
                      <S.DustRow>
                        <S.Text>
                          군산 대기질: {dustData.gunsan.airQuality}{" "}
                          {getAirQualityIcon(dustData.gunsan.airQuality)}
                        </S.Text>
                        <S.Text>
                          김제 대기질: {dustData.kimje.airQuality}{" "}
                          {getAirQualityIcon(dustData.gunsan.airQuality)}
                        </S.Text>
                      </S.DustRow>
                    </S.DustInfo>
                  </S.WeatherContainer>
                </S.GridItem>
                <S.GridItem className="item photo">
                  <S.PhotoBox>
                    <S.PhotoItem src={gallery[0]} />
                  </S.PhotoBox>
                  <S.PhotoBox>
                    <S.PhotoItem src={gallery[1]} />
                  </S.PhotoBox>
                  <S.PhotoBox>
                    <S.PhotoItem src={gallery[2]} />
                  </S.PhotoBox>
                  <S.PhotoBox>
                    <S.PhotoItem src={gallery[3]} />
                  </S.PhotoBox>
                </S.GridItem>
              </S.GridContainer>
            </>
          )}
        </S.Container>
      </S.Outter>
    </>
  );
}

export default App;
