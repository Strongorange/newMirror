import { atom } from "recoil";
import { defaultSettings } from "src/types/settingsTypes";

export const firebaseSettingsState = atom({
  key: "firebaseSettingsState",
  default: defaultSettings,
});
