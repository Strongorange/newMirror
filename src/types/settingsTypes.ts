import { DustStation } from "./dustStationTypes";

export interface Settings {
  theme: string;
  location: {
    selected: DustStation;
  };
}

export const defaultSettings: Settings = {
  theme: "light",
  location: {
    selected: {
      addr: "",
      dmX: "",
      dmY: "",
      item: "",
      mangName: "",
      stationName: "",
      year: "",
    },
  },
};
