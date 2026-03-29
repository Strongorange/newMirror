import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { createEmptyGallerySlots, MirrorGallerySlots } from "src/types/mediaTypes";

const { persistAtom } = recoilPersist({
  key: "galleryStateSession",
  storage: sessionStorage,
});

export type GalleryState = MirrorGallerySlots;

export const galleryState = atom<GalleryState>({
  key: "galleryState",
  default: createEmptyGallerySlots(),
  effects_UNSTABLE: [persistAtom],
});
