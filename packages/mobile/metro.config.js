const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const getWorkspaces = require("get-yarn-workspaces");
const { getAndroidAssetsResolutionFix } = require("./metro-android-assets-resolution-fix");

const workspaces = getWorkspaces(__dirname);

const androidAssetsResolutionFix = getAndroidAssetsResolutionFix({ depth: 3 });

module.exports = {
  transformer: {
    // Apply the Android assets resolution fix to the public path...
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  server: {
    // ...and to the server middleware.
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware)
    },
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing importing from all the project's packages.
  watchFolders: [
    path.resolve(__dirname, "../../node_modules"),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === __dirname)),
  ],
  resolver: {
    extraNodeModules: {
      // Resolve all react-native module imports to the locally-installed
      // version to ensure we don't hit cases where react-native tries to be
      // resolved from multiple node_modules dirs.
      "react-native": path.resolve(__dirname, "node_modules", "react-native"),
    },
  },
};
