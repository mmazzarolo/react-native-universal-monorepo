import { Platform } from 'react-native';

// eslint-disable-next-line
declare var __SUBPLATFORM__: "electron" | "browser-ext" | "android-tv" | "tvos" | "next" | undefined;

export const isDev = __DEV__;

// Tells on what variant of the platform we're running
export let subplatform: typeof __SUBPLATFORM__ = undefined;

// Injected in electron and browser-extension builds.
if (typeof __SUBPLATFORM__ === "string") {
  subplatform = __SUBPLATFORM__
}
// For tvOS and Android TV, we can check the Platform.isTV field 
else if (Platform.isTV && Platform.OS === "ios") {
  subplatform = "tvos";
} else if (Platform.isTV && Platform.OS === "android") {
  subplatform = "android-tv";
}
