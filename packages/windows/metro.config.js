const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const getWorkspaces = require("get-yarn-workspaces");
const { getMetroNohoistSettings } = require("@rnup/build-tools");

const workspaces = getWorkspaces(__dirname);

const nohoistSettings = getMetroNohoistSettings({
  dir: __dirname,
  workspaceName: "windows",
  reactNativeAlias: 'react-native-windows'
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
      ...nohoistSettings.blockList,
    ]),
    // Ensure we resolve nohoist libraries from this directory.
    extraNodeModules: nohoistSettings.extraNodeModules,
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing importing from all the project's packages.
  watchFolders: [
    path.resolve(__dirname, "../../node_modules"),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === __dirname)),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Required for macos and windows builds.
      },
    }),
  },
};
