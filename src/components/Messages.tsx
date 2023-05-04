import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { forecastsState } from "src/states/forecastsStates";
import { messagesState } from "src/states/messagesStates";

const DAWN = 0;
const MORNING = 1;
const LAUNCH = 2;
const DAY = 3;
const NIGHT = 4;
const MIDNIGHT = 5;

const Messages = () => {
  const messages = useRecoilValue(messagesState);
  const forecasts = useRecoilValue(forecastsState);

  // useEffect(() => {
  //   setIsLoading((state) => true);
  //   setTimeout(() => setIsLoading((state) => false), 1000);
  // }, [messages]);

  useEffect(() => {
    console.log(messages);
  }, [messages, forecasts]);

  return <div>Messages</div>;
};

export default Messages;
