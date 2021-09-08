const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const getWorkspaces = require("get-yarn-workspaces");
const {
  getAndroidAssetsResolutionFix,
} = require("./metro-android-assets-resolution-fix");
const {
  getMetroNohoistSettings,
  getMetroAndroidAssetsResolutionFix,
} = require("@rnup/build-tools");

const workspaces = getWorkspaces(__dirname);

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix({
  depth: 3,
});

const nohoistSettings = getMetroNohoistSettings({
  dir: __dirname,
  workspaceName: "mobile",
});

module.exports = {
  transformer: {
    // Apply the Android assets resolution fix to the public path...
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  server: {
    // ...and to the server middleware.
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    },
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing importing from all the project's packages.
  watchFolders: [
    path.resolve(__dirname, "../../node_modules"),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === __dirname)),
  ],
  resolver: {
    // Ensure we resolve nohoisted packages from this directory.
    blockList: exclusionList(nohoistSettings.blockList),
    extraNodeModules: nohoistSettings.extraNodeModules,
  },
};
