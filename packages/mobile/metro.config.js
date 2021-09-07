const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const getWorkspaces = require('get-yarn-workspaces');

const workspaces = getWorkspaces(__dirname);

// Add additional Yarn workspace package roots to the module map
const watchFolders = [
  path.resolve(__dirname, '../../node_modules'),
  ...workspaces.filter(workspaceDir => !(workspaceDir === __dirname)),
];


module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: watchFolders,
  resolver: {
    extraNodeModules: {
      // Resolve all react-native module imports to the locally-installed version
      'react-native': path.resolve(__dirname, 'node_modules', 'react-native'),

      // Resolve core-js imports to the locally installed version
      'core-js': path.resolve(__dirname, 'node_modules', 'core-js'),
    },
  },
};
