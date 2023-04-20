import { dustInstance } from "./axiosInstance";
import {
  BiHappyHeartEyes,
  BiHappyBeaming,
  BiHappyAlt,
  BiHappy,
  BiSad,
} from "react-icons/bi";
import { GiGasMask } from "react-icons/gi";
import { BsEmojiAngry } from "react-icons/bs";
import { ImAngry } from "react-icons/im";

const APIKEY = process.env.REACT_APP_DUST_APIKEY;

/**
 *
 * @param {boolean} isGunsan - true: 군산, false: 김제 요촌동
 * returns {Promise} - axios response data
 */
export const getDustData = async (isGunsan) => {
  const response = await dustInstance.get("", {
    params: {
      serviceKey: APIKEY,
      returnType: "json",
      numOfRows: 100,
      stationName: isGunsan ? "신풍동(군산)" : "요촌동",
      dataTerm: "DAILY",
      ver: "1.4",
    },
  });
  const responseData = response.data.response.body.items[0];
  const { pm25Value, pm10Value } = responseData;
  const airQuality = getAirQuality(pm10Value, pm25Value);

  const dustData = {
    airQuality,
    pm10Value,
    pm25Value,
  };

  return dustData;
};

/**
 * @description WHO 기준에 따라 미세먼지, 초미세먼지 농도에 따라 등급을 반환합니다.
 * @param {string | number} pm10Value - 미세먼지 농도 ug/m3
 * @param {string | number} pm25Value - 초미세먼지 농도 ug/m3
 * @returns {string} - 미세먼지, 초미세먼지 등급
 */
export const getAirQuality = (pm10Value, pm25Value) => {
  const pm10 = Number(pm10Value);
  const pm25 = Number(pm25Value);

  if (pm25 <= 8 || pm10 <= 15) {
    return "최고 좋음";
  } else if (pm25 <= 15 || pm10 <= 30) {
    return "좋음";
  } else if (pm25 <= 20 || pm10 <= 40) {
    return "양호";
  } else if (pm25 <= 25 || pm10 <= 50) {
    return "보통";
  } else if (pm25 <= 37 || pm10 <= 75) {
    return "나쁨";
  } else if (pm25 <= 50 || pm10 <= 100) {
    return "상당히 나쁨";
  } else if (pm25 <= 75 || pm10 <= 150) {
    return "매우 나쁨";
  } else {
    return "최악";
  }
};

/**
 * @description 미세먼지, 초미세먼지 등급에 따라 아이콘을 반환합니다.
 * @param {string} airQuality
 * @returns {JSX.Element} - airQuality에 따른 아이콘
 */
export const getAirQualityIcon = (airQuality) => {
  switch (airQuality) {
    case "최고 좋음":
      return <BiHappyHeartEyes />;
    case "좋음":
      return <BiHappyBeaming />;
    case "양호":
      return <BiHappyAlt />;
    case "보통":
      return <BiHappy />;
    case "나쁨":
      return <BiSad />;
    case "상당히 나쁨":
      return <BsEmojiAngry />;
    case "매우 나쁨":
      return <ImAngry />;
    case "최악":
      return <GiGasMask />;
    default:
      return <BiHappyHeartEyes />;
  }
};
