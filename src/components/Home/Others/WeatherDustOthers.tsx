import { dustDataOthersState } from "../../../states/dustDataStates";
import { forecastsState } from "../../../states/forecastsStates";
import { getAirQualityIcon } from "../../../utils/getDustData";
import React from "react";
import { SunnyOutline, WaterOutline } from "react-ionicons";
import { useRecoilValue } from "recoil";
import * as S from "../../../styles/WeathersDust.style";

const WeathersDustOthers = () => {
  const forecasts = useRecoilValue(forecastsState);
  const dustData = useRecoilValue(dustDataOthersState);

  return (
    <S.DustLayout>
      <S.WeatherContainer>
        <S.WeatherRow>
          <S.WeatherItem>
            <WaterOutline color={"#ababc8"} height="25px" width="25px" />
            <S.Text>{`${forecasts!.current!.humidity}`}%</S.Text>
          </S.WeatherItem>
          <S.WeatherItem>
            <SunnyOutline
              color={"#ababc8"}
              title={"uvi"}
              height="30px"
              width="35px"
            />
            <S.Text>{` ${forecasts!.current!.uvi}`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.WeatherRow>
          <S.WeatherItem>
            <S.WeatherIcon
              src={`http://openweathermap.org/img/wn/${
                forecasts.current!.weather[0].icon
              }@2x.png`}
            />
            <S.Text>{`${forecasts.current!.temp}°C`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.WeatherRow>
          <S.WeatherItem>
            <S.Text>체감온도</S.Text>
            <S.Text>{`${forecasts.current!.feels_like}°C`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.DustInfo id="airquality">
          <S.DustRow>
            <S.Text>
              {dustData.current.station.stationName} 대기질:{" "}
              {dustData.current.airQuality}{" "}
              {getAirQualityIcon(dustData.current.airQuality)}
            </S.Text>
            <S.Text>
              {dustData.selected.station.stationName} 대기질:{" "}
              {dustData.selected.airQuality}{" "}
              {getAirQualityIcon(dustData.selected.airQuality)}
            </S.Text>
          </S.DustRow>
        </S.DustInfo>
      </S.WeatherContainer>
    </S.DustLayout>
  );
};

export default WeathersDustOthers;
