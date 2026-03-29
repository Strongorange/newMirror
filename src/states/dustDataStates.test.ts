import { dustCityConfigs } from "./dustDataStates";

describe("dust city config", () => {
  it("keeps the display order as Seoul, Hwaseong, Gunsan", () => {
    expect(dustCityConfigs.map((city) => city.label)).toEqual([
      "서울시",
      "화성시",
      "군산시",
    ]);
  });

  it("uses the expected official station names", () => {
    expect(dustCityConfigs).toEqual([
      {
        key: "seoul",
        label: "서울시",
        stationName: "중구",
      },
      {
        key: "hwaseong",
        label: "화성시",
        stationName: "청계동",
      },
      {
        key: "gunsan",
        label: "군산시",
        stationName: "신풍동(군산)",
      },
    ]);
  });
});
