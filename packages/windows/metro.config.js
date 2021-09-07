const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const getWorkspaces = require("get-yarn-workspaces");

const workspaces = getWorkspaces(__dirname);

// Add additional Yarn workspace package roots to the module map
const watchFolders = [
  path.resolve(__dirname, "../../node_modules"),
  ...workspaces.filter((workspaceDir) => !(workspaceDir === __dirname)),
];

module.exports = {
  resolver: {
    blockList: exclusionList([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
      ),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip
      /.*\.ProjectImports\.zip/,
    ]),
  },
  watchFolders: watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      // Resolve all react-native module imports to the locally-installed version
      // of react-native-windows
      "react-native": path.resolve(
        __dirname,
        "node_modules",
        "react-native-windows"
      )
    },
  },
};
