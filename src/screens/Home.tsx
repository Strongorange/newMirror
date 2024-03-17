import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import * as S from "../styles/App.style";
import useSaveUserAgentWidthHeight from "../hooks/useSaveUserAgentandWidthHeight";
import getWeatherData from "../utils/getWeatherData";
import { getDustData } from "../utils/getDustData";
import ClockSection from "../components/Home/ClockSection";
import WeathersDust from "../components/Home/WeathersDust";
import { useSetRecoilState } from "recoil";
import { forecastsState } from "../states/forecastsStates";
import { dustDataState } from "../states/dustDataStates";
import Gallery from "src/components/Home/Gallery";
import { galleryState } from "src/states/galleryStates";
import { messagesState } from "src/states/messagesStates";
import Messages from "src/components/Home/Messages";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const setForecasts = useSetRecoilState(forecastsState);
  const setDustData = useSetRecoilState(dustDataState);
  const setGallery = useSetRecoilState(galleryState);
  const setMessages = useSetRecoilState(messagesState);

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
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "mirror", "message"), (doc) => {
      const data = doc.data();
      data && setMessages(data);
    });

    onSnapshot(doc(firestore, "mirror", "gallery"), (doc) => {
      setGallery(doc.data()!.photos);
    });

    getWeatherAndDust();
    let interval = setInterval(() => getWeatherAndDust(), 1800000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 1000 * 60 * 60);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <S.Outter>
        <S.Container>
          {isLoading ? (
            <S.Text>노루를 데려오는 중</S.Text>
          ) : (
            <>
              <Messages />
              <S.GridContainer>
                <ClockSection />
                <WeathersDust />
                <Gallery />
              </S.GridContainer>
            </>
          )}
        </S.Container>
      </S.Outter>
    </>
  );
}

export default Home;
