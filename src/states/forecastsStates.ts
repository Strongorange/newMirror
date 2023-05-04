import { Forecasts } from "../types/forecastsTypes";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "forecastsStateSession",
  storage: sessionStorage,
});

export const forecastsState = atom<Partial<Forecasts>>({
  key: "forecastsState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
