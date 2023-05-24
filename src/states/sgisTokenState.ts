import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sgisAccessToken",
  storage: localStorage,
});

interface SgisTokenState {
  accessTimeout: string;
  accessToken: string;
}

export const sgisTokenState = atom<SgisTokenState>({
  key: "sgisTokenState",
  default: {
    accessTimeout: "",
    accessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
