import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import { messagesState } from "src/states/messagesStates";
import { produce } from "immer";

import * as S from "../../styles/Messages.style";

const Messages = () => {
  const messages = useRecoilValue(messagesState);
  const forecasts = useRecoilValue(forecastsState);
  const weather = forecasts.current?.weather[0].main;
  const [output, setOutput] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addWeatherMessages = useCallback((draft: string[], weather: string) => {
    if (weather === "Rain") {
      draft.push(...(messages.rain ?? []));
    } else if (weather === "Thunderstorm") {
      draft.push(...(messages.thunder ?? []));
    } else if (weather === "Snow") {
      draft.push(...(messages.snow ?? []));
    } else if (weather === "Drizzle") {
      draft.push(...(messages.drizzle ?? []));
    } else if (weather === "Clear") {
      draft.push(...(messages.clear ?? []));
    } else if (weather === "Clouds") {
      draft.push(...(messages.clouds ?? []));
    }
  }, [messages]);

  useEffect(() => {
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

    const nextOutput = produce<string[]>([], (draft) => {
      draft.push(...(messages.always ?? []));

      if (timeOfDay === "midnight") {
        draft.push(...(messages.midnight ?? []));
      } else if (timeOfDay === "dawn") {
        draft.push(...(messages.dawn ?? []));
      } else if (timeOfDay === "morning") {
        draft.push(...(messages.morning ?? []));
      } else if (timeOfDay === "day") {
        draft.push(...(messages.day ?? []));
      } else if (timeOfDay === "night") {
        draft.push(...(messages.night ?? []));
      }

      if (weather) {
        addWeatherMessages(draft, weather);
      }
    });

    setOutput(nextOutput);
    setCurrentIndex(0);
  }, [addWeatherMessages, messages, weather]);

  useEffect(() => {
    if (output.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % output.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [output]);

  return (
    <S.MessagesLayout>
      <S.Text>{output[currentIndex] ?? ""}</S.Text>
    </S.MessagesLayout>
  );
};

export default Messages;
