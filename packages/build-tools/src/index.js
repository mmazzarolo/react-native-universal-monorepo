const { getWebpackNohoistAlias } = require("./get-webpack-nohoist-alias");
const { getMetroNohoistSettings } = require("./get-metro-nohoist-settings");
const {
  getMetroAndroidAssetsResolutionFix,
} = require("./get-metro-android-assets-resolution-fix");

module.exports = {
  getWebpackNohoistAlias,
  getMetroAndroidAssetsResolutionFix,
  getMetroNohoistSettings,
};
