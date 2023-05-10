export interface Settings {
  [key: string]: any;
}

export const defaultSettings: Settings = {
  theme: "light",
  location: {
    current: {
      latitude: 0,
      longitude: 0,
    },
    selected: {
      latitude: 0,
      longitude: 0,
    },
  },
};
