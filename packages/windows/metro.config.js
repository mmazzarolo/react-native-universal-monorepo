const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const { getMetroTools } = require("react-native-monorepo-tools");

// Get the metro settings to make it compatible with Yarn workspaces.
const monorepoMetroTools = getMetroTools({
  reactNativeAlias: "react-native-windows",
});

module.exports = {
  resolver: {
    blockList: exclusionList([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, "windows").replace(/[/\\]/g, "/")}.*`
      ),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip
      /.*\.ProjectImports\.zip/,

     // Ensure we resolve nohoist libraries from this directory.
     ...monorepoMetroTools.blockList,
    ]),
    // Ensure we resolve nohoist libraries from this directory.
    extraNodeModules: monorepoMetroTools.extraNodeModules,
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing from any workspace.
  watchFolders: monorepoMetroTools.watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Required for macos and windows builds.
      },
    }),
  },
};
