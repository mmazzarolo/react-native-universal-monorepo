const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const getWorkspaces = require("get-yarn-workspaces");

const workspaces = getWorkspaces(__dirname);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false, // Required for macos and windows builds.
      },
    }),
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
      // version of react-native-macos.
      "react-native": path.resolve(
        __dirname,
        "node_modules",
        "react-native-macos"
      )
    },
  },
};
