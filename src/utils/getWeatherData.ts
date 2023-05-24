import { weatherInstance } from "./axiosInstance";

const APIKEY = process.env.REACT_APP_WEATHER_APIKEY;

const getWeatherData = async (lat?: number, long?: number) => {
  // lat, long이 존재하지 않으면 군산시의 날씨를 가져옴
  const latitude = lat ? lat : 35.95;
  const longitude = long ? long : 126.71;

  const response = await weatherInstance.get("", {
    params: {
      lat: latitude,
      lon: longitude,
      units: "metric",
      exclude: "alerts,minutely,hourly",
      appid: APIKEY,
      lang: "kr",
    },
  });
  return response.data;
};

export default getWeatherData;
