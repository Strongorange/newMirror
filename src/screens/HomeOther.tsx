import React, { useEffect, useState } from "react";
import ClockSection from "src/components/Home/ClockSection";
import * as S from "src/styles/App.style";
import getWeatherData from "src/utils/getWeatherData";
import useLocation from "src/hooks/useLocation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import useFirestore from "src/hooks/useFirestore";
import WeathersDust from "src/components/Home/WeathersDust";
import useGetSGISToken from "src/hooks/useGetSGISToken";

const HomeOther = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, error] = useLocation();
  const [forecasts, setForecasts] = useRecoilState(forecastsState);
  // hooks
  useFirestore();
  useGetSGISToken();

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

  // useEffects
  useEffect(() => {
    console.log("currentLocation", currentLocation);
  }, [currentLocation]);

  // renders
  if (error) alert(error);

  return (
    <S.Outter>
      <S.Container>
        <S.GridContainer>
          <ClockSection />
          <WeathersDust />
        </S.GridContainer>
      </S.Container>
    </S.Outter>
  );
};

export default HomeOther;
