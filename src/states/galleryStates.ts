import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "galleryStateSession",
  storage: sessionStorage,
});

type GalleryState = string[];

export const galleryState = atom<GalleryState>({
  key: "galleryState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
