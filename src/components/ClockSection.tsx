import React from "react";
import * as S from "../styles/ClockSection.style";
import Clock from "react-live-clock";

const ClockSection = () => {
  return (
    <S.ClockLayout>
      <Clock
        format={`ddd, YYYY년 M월, D일`}
        locale="ko"
        timezone="Asia/Seoul"
        className="clock-date"
        style={{ marginBottom: "20px" }}
      />
      <Clock
        format={"hh:mm:ss"}
        interval={100}
        timezone={"Asia/Seoul"}
        ticking={true}
        className="clock-time"
      />
    </S.ClockLayout>
  );
};

export default ClockSection;
