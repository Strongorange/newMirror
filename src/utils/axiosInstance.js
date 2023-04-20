import axios from "axios";

const weatherInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/onecall",
  timeout: 4000,
});

const dustInstance = axios.create({
  baseURL:
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty",
});

export { weatherInstance, dustInstance };
