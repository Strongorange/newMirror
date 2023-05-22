import React, { useEffect, useState } from "react";
import ClockSection from "src/components/Home/ClockSection";
import * as S from "src/styles/App.style";
import getWeatherData from "src/utils/getWeatherData";
import useLocation from "src/hooks/useLocation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import useFirestore from "src/hooks/useFirestore";
import useGetSGISToken from "src/hooks/useGetSGISToken";
import {
  getDustDataByStationName,
  getDustDataByTM,
} from "src/utils/getDustData";
import { dustDataOthersState } from "src/states/dustDataStates";
import { produce } from "immer";
import WeathersDustOthers from "src/components/Home/Others/WeatherDustOthers";
import { useQuery } from "react-query";
import Gallery from "src/components/Home/Gallery";
import Messages from "src/components/Home/Messages";
import { firebaseSettingsState } from "src/states/firebaseSettingStates";

const HomeOther = () => {
  // states
  const [initialLoading, setInitialLoading] = useState(true);
  const setForecasts = useSetRecoilState(forecastsState);
  const [dustData, setDustData] = useRecoilState(dustDataOthersState);
  const settings = useRecoilValue(firebaseSettingsState);

  // hooks
  // 현재 위치 정보 상태, Lat, Long, TM_X, TM_Y
  const [locations, error] = useLocation();
  // FireStore 데이터 구독
  useFirestore();
  // SGIStoken 가져오기
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

      const dustDataSelectedPositionPromise = getDustDataByStationName(
        settings.location.selected.stationName
      );

      const [weatherData, dustDataCurrentPosition, dustDataSelectedPosition] =
        await Promise.all([
          weatherDataPromise,
          dustDataCurrentPositionPromise,
          dustDataSelectedPositionPromise,
        ]);
      // immer 사용해 상태 업데이트
      const nextDustData = produce(dustData, (draft) => {
        draft.current.airQuality = dustDataCurrentPosition.airQuality;
        draft.current.pm10Value = dustDataCurrentPosition.pm10Value;
        draft.current.pm25Value = dustDataCurrentPosition.pm25Value;
        draft.current.station = dustDataCurrentPosition.station!;
        draft.selected.airQuality = dustDataSelectedPosition?.airQuality!;
        draft.selected.pm10Value = dustDataSelectedPosition?.pm10Value!;
        draft.selected.pm25Value = dustDataSelectedPosition?.pm25Value!;
        draft.selected.station = dustDataSelectedPosition?.stationName!;
      });

      setForecasts(weatherData);
      setDustData(nextDustData);
    } catch (error) {
      alert("날씨, 먼지 데이터 가져오기에서 오류 발생");
      console.log(error);
    }
  };

  // useEffects

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 6000);
  }, []);

  // 디버깅

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  useEffect(() => {
    console.log(dustData);
  }, [dustData]);

  //react-query
  const { isLoading } = useQuery(["appData", settings], getWeatherAndDust, {
    // 3시간마다 데이터 업데이트
    refetchInterval: 3 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !initialLoading,
  });

  // renders
  if (error) alert(error);

  return (
    <S.Outter>
      <S.Container>
        {isLoading || initialLoading ? (
          <S.Text>로딩중...</S.Text>
        ) : (
          <>
            <Messages />
            <S.GridContainer>
              <ClockSection />
              <WeathersDustOthers />
              <Gallery />
            </S.GridContainer>
          </>
        )}
      </S.Container>
    </S.Outter>
  );
};

export default HomeOther;
