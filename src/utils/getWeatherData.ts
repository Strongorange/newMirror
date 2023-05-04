import { weatherInstance } from "./axiosInstance";

const APIKEY = process.env.REACT_APP_WEATHER_APIKEY;
const latitude = 35.95;
const longitude = 126.71;

const getWeatherData = async () => {
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
