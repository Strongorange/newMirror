import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Messages } from "src/types/messagesTypes";

const { persistAtom } = recoilPersist({
  key: "messagesStateSession",
  storage: sessionStorage,
});

export const messagesState = atom<Partial<Messages>>({
  key: "messagesState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
