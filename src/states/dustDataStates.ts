import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  defaultDustDataState,
  DustDataOthersState,
} from "src/types/dustDataStates";

const { persistAtom } = recoilPersist({
  key: "dustDataStateSession",
  storage: sessionStorage,
});

export const dustCityConfigs = [
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
] as const;

export type DustCityKey = (typeof dustCityConfigs)[number]["key"];

export interface DustDataSummary {
  airQuality: string;
  pm10Value: string;
  pm25Value: string;
}

export type DustDataState = Record<DustCityKey, DustDataSummary>;

export const dustDataState = atom<DustDataState>({
  key: "dustDataState",
  default: {
    seoul: { airQuality: "", pm10Value: "", pm25Value: "" },
    hwaseong: { airQuality: "", pm10Value: "", pm25Value: "" },
    gunsan: { airQuality: "", pm10Value: "", pm25Value: "" },
  },
  effects_UNSTABLE: [persistAtom],
});

export const dustDataOthersState = atom<DustDataOthersState>({
  key: "dustDataOthersState",
  default: defaultDustDataState,
});
