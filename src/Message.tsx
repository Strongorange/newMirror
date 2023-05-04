import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
  
    100% {
        opacity: 0;

    }
  
`;

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  15%, 85% {
    opacity: 1;
  }
`;

const TextContainer = styled.div`
  .active {
    animation: ${fadeIn} 1s ease-in-out;
  }

  .hidden {
    animation-fill-mode: forwards;
    animation: ${fadeOut} 1s ease-in-out;
  }
`;

const Text = styled.span`
  font-size: 40px;
  animation: ${fadeInOut} 12s linear infinite;
`;

const DAWN = 0;
const MORNING = 1;
const LAUNCH = 2;
const DAY = 3;
const NIGHT = 4;
const MIDNIGHT = 5;

const Message = ({ forecasts, messages }: any) => {
  const [isDay, setIsDay] = useState<any>(MORNING);
  const [output, setOutput] = useState<any>(null);
  const [timer, setTimer] = useState<any>(0);
  const messageTxt = useRef<HTMLDivElement>(null);

  const getIsDay = () => {
    const curr = new Date();

    // 2. UTC 시간 계산
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const hour = kr_curr.getHours();
    if (hour >= 0 && hour <= 4) {
      setIsDay((state: any) => (state = MIDNIGHT));
      if (forecasts === "Rain") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.midnight,
              ...messages.rain,
            ])
        );
      } else if (forecasts === "Thunderstorm") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.midnight,
              ...messages.thunder,
            ])
        );
      } else if (forecasts === "Snow") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.midnight,
              ...messages.snow,
            ])
        );
      } else if (forecasts === "Drizzle") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.drizzle,
              ...messages.midnight,
            ])
        );
      } else if (forecasts === "Clear") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.clear,
              ...messages.midnight,
            ])
        );
      } else if (forecasts === "Clouds") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.clouds,
              ...messages.midnight,
            ])
        );
      } else {
        setOutput(
          (state: any) => (state = [...messages.always, ...messages.midnight])
        );
      }
    } else if (hour > 4 && hour <= 7) {
      setIsDay((state: any) => (state = DAWN));
      if (forecasts === "Rain") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.dawn, ...messages.rain])
        );
      } else if (forecasts === "Thunderstorm") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.dawn,
              ...messages.thunder,
            ])
        );
      } else if (forecasts === "Snow") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.dawn, ...messages.snow])
        );
      } else if (forecasts === "Drizzle") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.drizzle,
              ...messages.dawn,
            ])
        );
      } else if (forecasts === "Clear") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.clear, ...messages.dawn])
        );
      } else if (forecasts === "Clouds") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.clouds, ...messages.dawn])
        );
      } else {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.dawn, ...messages.dawn])
        );
      }
    } else if (hour > 7 && hour <= 11) {
      setIsDay((state: any) => (state = MORNING));
      if (forecasts === "Rain") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.morning,
              ...messages.rain,
            ])
        );
      } else if (forecasts === "Thunderstorm") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.morning,
              ...messages.thunder,
            ])
        );
      } else if (forecasts === "Snow") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.morning,
              ...messages.snow,
            ])
        );
      } else if (forecasts === "Drizzle") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.drizzle,
              ...messages.morning,
            ])
        );
      } else if (forecasts === "Clear") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.clear,
              ...messages.morning,
            ])
        );
      } else if (forecasts === "Clouds") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.clouds,
              ...messages.morning,
            ])
        );
      } else {
        setOutput(
          (state: any) => (state = [...messages.always, ...messages.morning])
        );
      }
    } else if (hour >= 12 && hour <= 18) {
      setIsDay((state: any) => (state = DAY));
      if (forecasts === "Rain") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.day, ...messages.rain])
        );
      } else if (forecasts === "Thunderstorm") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.day, ...messages.thunder])
        );
      } else if (forecasts === "Snow") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.day, ...messages.snow])
        );
      } else if (forecasts === "Drizzle") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.drizzle, ...messages.day])
        );
      } else if (forecasts === "Clear") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.clear, ...messages.day])
        );
      } else if (forecasts === "Clouds") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.clouds, ...messages.day])
        );
      } else {
        setOutput(
          (state: any) => (state = [...messages.always, ...messages.day])
        );
      }
    } else if (hour > 18 && hour <= 24) {
      setIsDay((state: any) => (state = NIGHT));
      if (forecasts === "Rain") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.night, ...messages.rain])
        );
      } else if (forecasts === "Thunderstorm") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.night,
              ...messages.thunder,
            ])
        );
      } else if (forecasts === "Snow") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.night, ...messages.snow])
        );
      } else if (forecasts === "Drizzle") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.drizzle,
              ...messages.night,
            ])
        );
      } else if (forecasts === "Clear") {
        setOutput(
          (state: any) =>
            (state = [...messages.always, ...messages.clear, ...messages.night])
        );
      } else if (forecasts === "Clouds") {
        setOutput(
          (state: any) =>
            (state = [
              ...messages.always,
              ...messages.clouds,
              ...messages.night,
            ])
        );
      } else {
        setOutput(
          (state: any) => (state = [...messages.always, ...messages.night])
        );
      }
    }
  };

  useEffect(() => {
    getIsDay();
    let interval = setInterval(
      () => setTimer((timer: any) => timer + 1),
      12000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <TextContainer ref={messageTxt}>
      <Text>
        {output ? output[Math.floor(Math.random() * output.length)] : "hi"}
      </Text>
    </TextContainer>
  );
};

export default Message;