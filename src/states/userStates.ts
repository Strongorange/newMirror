import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";

const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: sessionStorage,
});

export const userState = atom<Partial<User> | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
