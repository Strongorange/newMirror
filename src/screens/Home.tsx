import { useState, useEffect, useCallback } from "react";
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

  const getWeatherAndDust = useCallback(async () => {
    setIsLoading(true);

    const [weatherResult, dustDataGunsanResult, dustDataKimjeResult] =
      await Promise.allSettled([
        getWeatherData(),
        getDustData(true),
        getDustData(false),
      ]);

    if (weatherResult.status === "fulfilled") {
      setForecasts(weatherResult.value);
    } else {
      console.log("날씨 데이터 가져오기에서 오류 발생 : \n", weatherResult.reason);
    }

    setDustData((currentDustData) => ({
      gunsan:
        dustDataGunsanResult.status === "fulfilled"
          ? dustDataGunsanResult.value
          : currentDustData.gunsan,
      kimje:
        dustDataKimjeResult.status === "fulfilled"
          ? dustDataKimjeResult.value
          : currentDustData.kimje,
    }));

    if (dustDataGunsanResult.status === "rejected") {
      console.log(
        "군산 대기질 데이터 가져오기에서 오류 발생 : \n",
        dustDataGunsanResult.reason
      );
    }

    if (dustDataKimjeResult.status === "rejected") {
      console.log(
        "김제 대기질 데이터 가져오기에서 오류 발생 : \n",
        dustDataKimjeResult.reason
      );
    }

    setTimeout(() => setIsLoading(false), 500);
  }, [setDustData, setForecasts]);

  useEffect(() => {
    const unsubscribeMessages = onSnapshot(doc(firestore, "mirror", "message"), (doc) => {
      const data = doc.data();
      data && setMessages(data);
    });

    const unsubscribeGallery = onSnapshot(
      doc(firestore, "mirror", "gallery"),
      (doc) => {
        setGallery(doc.data()?.photos ?? []);
      }
    );

    getWeatherAndDust();
    const interval = setInterval(() => getWeatherAndDust(), 1800000);

    return () => {
      unsubscribeMessages();
      unsubscribeGallery();
      clearInterval(interval);
    };
  }, [getWeatherAndDust, setGallery, setMessages]);

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
