import React, { useEffect, useState } from "react";
import ClockSection from "src/components/Home/ClockSection";
import * as S from "src/styles/App.style";
import getWeatherData from "src/utils/getWeatherData";
import useLocation from "src/hooks/useLocation";

const HomeOther = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, error] = useLocation();

  // functions

  // useEffects

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  return (
    <S.Outter>
      <S.Container>
        <S.GridContainer>
          <ClockSection />
        </S.GridContainer>
      </S.Container>
    </S.Outter>
  );
};

export default HomeOther;
