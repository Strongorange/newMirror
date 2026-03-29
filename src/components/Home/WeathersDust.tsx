import { dustDataState } from "../../states/dustDataStates";
import { forecastsState } from "../../states/forecastsStates";
import { getAirQualityIcon } from "../../utils/getDustData";
import React from "react";
import { SunnyOutline, WaterOutline } from "react-ionicons";
import { useRecoilValue } from "recoil";
import * as S from "../../styles/WeathersDust.style";

const WeathersDust = () => {
  const forecasts = useRecoilValue(forecastsState);
  const dustData = useRecoilValue(dustDataState);
  const currentWeather = forecasts.current;
  const gunsanAirQuality = dustData.gunsan.airQuality;
  const kimjeAirQuality = dustData.kimje.airQuality;

  return (
    <S.DustLayout>
      <S.WeatherContainer>
        <S.WeatherRow>
          <S.WeatherItem>
            <WaterOutline color={"#ababc8"} height="25px" width="25px" />
            <S.Text>{`${currentWeather?.humidity ?? "-"}`}%</S.Text>
          </S.WeatherItem>
          <S.WeatherItem>
            <SunnyOutline
              color={"#ababc8"}
              title={"uvi"}
              height="30px"
              width="35px"
            />
            <S.Text>{` ${currentWeather?.uvi ?? "-"}`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.WeatherRow>
          <S.WeatherItem>
            <S.WeatherIcon
              src={`http://openweathermap.org/img/wn/${
                currentWeather?.weather?.[0]?.icon ?? "01d"
              }@2x.png`}
            />
            <S.Text>{`${currentWeather?.temp ?? "-"}°C`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.WeatherRow>
          <S.WeatherItem>
            <S.Text>체감온도</S.Text>
            <S.Text>{`${currentWeather?.feels_like ?? "-"}°C`}</S.Text>
          </S.WeatherItem>
        </S.WeatherRow>
        <S.DustInfo id="airquality">
          <S.DustRow>
            <S.Text>
              군산 대기질: {gunsanAirQuality} {getAirQualityIcon(gunsanAirQuality)}
            </S.Text>
            <S.Text>
              김제 대기질: {kimjeAirQuality} {getAirQualityIcon(kimjeAirQuality)}
            </S.Text>
          </S.DustRow>
        </S.DustInfo>
      </S.WeatherContainer>
    </S.DustLayout>
  );
};

export default WeathersDust;
