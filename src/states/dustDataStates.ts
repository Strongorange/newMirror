import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "dustDataStateSession",
  storage: sessionStorage,
});

interface DustDataState {
  gunsan: { airQuality: string; pm10Value: string; pm25Value: string };
  kimje: { airQuality: string; pm10Value: string; pm25Value: string };
}

export const dustDataState = atom<DustDataState>({
  key: "dustDataState",
  default: {
    gunsan: { airQuality: "", pm10Value: "", pm25Value: "" },
    kimje: { airQuality: "", pm10Value: "", pm25Value: "" },
  },
  effects_UNSTABLE: [persistAtom],
});
