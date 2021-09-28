declare var __SUBPLATFORM__: "electron" | "browser-ext" | "next" | undefined; // eslint-disable-line

export const isDev = __DEV__;

// Injected in electron and browser-extension builds.
export const subplatform =
  typeof __SUBPLATFORM__ === "string" ? __SUBPLATFORM__ : undefined;

