import React, { useEffect } from "react";
import ClockSection from "src/components/Home/ClockSection";
import * as S from "src/styles/App.style";
import getWeatherData from "src/utils/getWeatherData";
import useLocation from "src/hooks/useLocation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import useFirestore from "src/hooks/useFirestore";
import useGetSGISToken from "src/hooks/useGetSGISToken";
import { getDustDataByTM } from "src/utils/getDustData";
import { dustDataOthersState } from "src/states/dustDataStates";
import { produce } from "immer";
import WeathersDustOthers from "src/components/Home/Others/WeatherDustOthers";
import { useQuery } from "react-query";

const HomeOther = () => {
  // states

  const [forecasts, setForecasts] = useRecoilState(forecastsState);
  const [dustData, setDustData] = useRecoilState(dustDataOthersState);

  // hooks
  const [locations, error] = useLocation();
  useFirestore();
  useGetSGISToken();

  // functions
  const getWeatherAndDust = async () => {
    try {
      const weatherDataPromise = getWeatherData(
        Number(locations.currentLocation!.latitude!),
        Number(locations.currentLocation!.longitude!)
      );
      const dustDataCurrentPositionPromise = getDustDataByTM(
        locations.currentLocation!.tmX,
        locations.currentLocation!.tmY
      );

      const [weatherData, dustDataCurrentPosition] = await Promise.all([
        weatherDataPromise,
        dustDataCurrentPositionPromise,
      ]);
      // immer 사용해 상태 업데이트
      const nextDustData = produce(dustData, (draft) => {
        draft.current.airQuality = dustDataCurrentPosition.airQuality;
        draft.current.pm10Value = dustDataCurrentPosition.pm10Value;
        draft.current.pm25Value = dustDataCurrentPosition.pm25Value;
        draft.current.station = dustDataCurrentPosition.station!;
      });

      setForecasts(weatherData);
      setDustData(nextDustData);
    } catch (error) {
      alert("날씨, 먼지 데이터 가져오기에서 오류 발생");
      console.log(error);
    }
  };

  //react-query
  const { isLoading } = useQuery("appData", getWeatherAndDust, {
    // 3시간마다 데이터 업데이트
    refetchInterval: 3 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // useEffects

  // renders
  if (error) alert(error);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <S.Outter>
      <S.Container>
        <S.GridContainer>
          <ClockSection />
          <WeathersDustOthers />
        </S.GridContainer>
      </S.Container>
    </S.Outter>
  );
};

export default HomeOther;
