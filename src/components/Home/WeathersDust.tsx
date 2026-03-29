import { dustDataState } from "../../states/dustDataStates";
import { forecastsState } from "../../states/forecastsStates";
import { getAirQualityIcon } from "../../utils/getDustData";
import React from "react";
import { SunnyOutline, WaterOutline } from "react-ionicons";
import { useRecoilValue } from "recoil";
import * as S from "../../styles/WeathersDust.style";
import { dustCityConfigs } from "../../states/dustDataStates";

const WeathersDust = () => {
  const forecasts = useRecoilValue(forecastsState);
  const dustData = useRecoilValue(dustDataState);
  const currentWeather = forecasts.current;

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
            {dustCityConfigs.map((city) => {
              const airQuality = dustData[city.key].airQuality;

              return (
                <S.Text key={city.key}>
                  {city.label} 대기질: {airQuality} {getAirQualityIcon(airQuality)}
                </S.Text>
              );
            })}
          </S.DustRow>
        </S.DustInfo>
      </S.WeatherContainer>
    </S.DustLayout>
  );
};

export default WeathersDust;
