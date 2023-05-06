import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import { messagesState } from "src/states/messagesStates";
import { produce } from "immer";

import * as S from "../../styles/Messages.style";

const Messages = () => {
  const messages = useRecoilValue(messagesState);
  const forecasts = useRecoilValue(forecastsState);
  const weather = forecasts.current?.weather[0].main;
  let timer = 0;

  const [output, setOutput] = useState<string[]>([]);

  const addWeatherMessages = (draft: string[], weather: string) => {
    if (weather === "Rain") {
      draft.push(...messages.rain!);
    } else if (weather === "Thunderstorm") {
      draft.push(...messages.thunder!);
    } else if (weather === "Snow") {
      draft.push(...messages.snow!);
    } else if (weather === "Drizzle") {
      draft.push(...messages.drizzle!);
    } else if (weather === "Clear") {
      draft.push(...messages.clear!);
    } else if (weather === "Clouds") {
      draft.push(...messages.clouds!);
    }
  };

  const getIsDay = () => {
    const cur = new Date();
    // UTC 시간 계산
    const utc = cur.getTime() + cur.getTimezoneOffset() * 60 * 1000;

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const krCur = new Date(utc + KR_TIME_DIFF);

    const hour = krCur.getHours();
    const timeOfDay = [
      "midnight",
      "dawn",
      "morning",
      "day",
      "night",
      "midnight",
    ][Math.floor(hour / 4)];

    setOutput(
      produce((draft) => {
        draft.push(...messages.always!);
        if (timeOfDay === "midnight") {
          draft.push(...messages.midnight!);
          addWeatherMessages(draft, weather!);
        } else if (timeOfDay === "dawn") {
          draft.push(...messages.dawn!);
          addWeatherMessages(draft, weather!);
        } else if (timeOfDay === "morning") {
          draft.push(...messages.morning!);
          addWeatherMessages(draft, weather!);
        } else if (timeOfDay === "day") {
          draft.push(...messages.day!);
          addWeatherMessages(draft, weather!);
        } else if (timeOfDay === "night") {
          draft.push(...messages.night!);
          addWeatherMessages(draft, weather!);
        }
      })
    );
  };

  useEffect(() => {
    getIsDay();
    let interval = setInterval(() => timer++, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.MessagesLayout>
      <S.Text>
        {output ? output[Math.floor(Math.random() * output.length)] : "hi"}
      </S.Text>
    </S.MessagesLayout>
  );
};

export default Messages;
