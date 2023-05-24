export type NearbyStationType = {
  stationName: string;
  addr: string;
  tm: number;
  stationCode: string;
};

export interface DustDataOthersState {
  current: {
    airQuality: string;
    pm10Value: string;
    pm25Value: string;
    station: NearbyStationType;
  };
  selected: {
    airQuality: string;
    pm10Value: string;
    pm25Value: string;
    station: string;
  };
}

export const defaultDustDataState: DustDataOthersState = {
  current: {
    airQuality: "",
    pm10Value: "",
    pm25Value: "",
    station: {
      stationName: "",
      addr: "",
      tm: 0,
      stationCode: "",
    },
  },
  selected: {
    airQuality: "",
    pm10Value: "",
    pm25Value: "",
    station: "",
  },
};
