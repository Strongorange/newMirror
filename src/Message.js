import React, { useState, useEffect } from "react";
import { HourglassOutline } from "react-ionicons";
import styled from "styled-components";

const Text = styled.span`
  font-size: 60px;
`;

const DAWN = 0;
const MORNING = 1;
const LAUNCH = 2;
const DAY = 3;
const NIGHT = 4;
const MIDNIGHT = 5;

const Message = ({ forecasts, messages }) => {
  const [isDay, setIsDay] = useState(MORNING);
  const [output, setOutput] = useState(null);
  const [timer, setTimer] = useState(0);

  const getIsDay = () => {
    const curr = new Date();

    // 2. UTC 시간 계산
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const hour = kr_curr.getHours();
    if (hour >= 0 && hour <= 4) {
      setIsDay((state) => (state = MIDNIGHT));
      setOutput(
        (state) => (state = [...messages.always, ...messages.midnight])
      );
    } else if (hour > 4 && hour <= 7) {
      setIsDay((state) => (state = DAWN));
      setOutput((state) => (state = [...messages.always, ...messages.dawn]));
    } else if (hour > 7 && hour <= 11) {
      setIsDay((state) => (state = MORNING));
      setOutput((state) => (state = [...messages.always, ...messages.morning]));
    } else if (hour > 11 && hour <= 12) {
      setIsDay((state) => (state = LAUNCH));
      setOutput((state) => (state = [...messages.always, ...messages.launch]));
    } else if (hour > 12 && hour <= 18) {
      setIsDay((state) => (state = DAY));
      setOutput((state) => (state = [...messages.always, ...messages.day]));
      setOutput((state) => (state = [...messages.always, ...messages.day]));
    } else if (hour > 18 && hour <= 24) {
      setIsDay((state) => (state = NIGHT));
      setOutput((state) => (state = [...messages.always, ...messages.night]));
    }
  };

  useEffect(() => {
    getIsDay();
    console.log(messages);
    let interval = setInterval(() => setTimer((timer) => timer + 1), 10000);
  }, []);

  useEffect(() => {
    getIsDay();
  }, [timer]);

  //   return <Text>hi</Text>;

  return (
    <Text>
      {output ? output[Math.floor(Math.random() * output.length)] : "hi"}
    </Text>
  );
};

export default Message;
