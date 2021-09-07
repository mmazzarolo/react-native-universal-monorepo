declare var __SUB_PLATFORM__: "electron" | "browser-ext" | undefined; // eslint-disable-line

export const isDev = __DEV__;

// Injected in electron and browser-extension builds.
export const subPlatform =
  typeof __SUB_PLATFORM__ === "string" ? __SUB_PLATFORM__ : undefined;
