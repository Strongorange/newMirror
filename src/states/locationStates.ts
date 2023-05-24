import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "location",
  storage: sessionStorage,
});

type Location = {
  latitude: number;
  longitude: number;
  tmX: number;
  tmY: number;
};

export interface ForecastLocations {
  currentLocation?: Location;
}

export const locationState = atom<ForecastLocations>({
  key: "locationState",
  default: {
    currentLocation: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});
