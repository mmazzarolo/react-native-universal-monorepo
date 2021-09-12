const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const getWorkspaces = require("get-yarn-workspaces");
const { getMetroNohoistSettings } = require("@rnup/build-tools/src");

const workspaces = getWorkspaces(__dirname);

const nohoistSettings = getMetroNohoistSettings({
  dir: __dirname,
  workspaceName: "macos",
  reactNativeAlias: "react-native-macos",
});

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
    // Ensure we resolve nohoist libraries from this directory.
    blacklistRE: exclusionList(nohoistSettings.blockList),
    extraNodeModules: nohoistSettings.extraNodeModules,
  },
};
