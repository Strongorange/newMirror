import React, { useEffect, useState } from "react";
import ClockSection from "src/components/Home/ClockSection";
import * as S from "src/styles/App.style";
import getWeatherData from "src/utils/getWeatherData";
import useLocation from "src/hooks/useLocation";
import { useSetRecoilState } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import useFirestore from "src/hooks/useFirestore";

const HomeOther = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, error] = useLocation();
  const setForecasts = useSetRecoilState(forecastsState);

  // functions
  const getWeatherAndDust = async () => {
    setIsLoading(true);

    try {
      const weatherDataPromise = getWeatherData(
        Number(currentLocation.latitude!),
        Number(currentLocation.longitude!)
      );

      const [weatherData] = await Promise.all([weatherDataPromise]);
      setForecasts(weatherData);
    } catch (error) {
      alert("날씨, 먼지 데이터 가져오기에서 오류 발생");
      console.log(error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // hooks
  useFirestore();

  // useEffects

  // renders
  if (error) alert(error);

  return (
    <S.Outter>
      <S.Container>
        <S.GridContainer>
          <ClockSection />
        </S.GridContainer>
      </S.Container>
    </S.Outter>
  );
};

export default HomeOther;
