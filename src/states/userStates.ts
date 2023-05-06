import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";

const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: sessionStorage,
});

export const userState = atom<Partial<User>>({
  key: "userState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
