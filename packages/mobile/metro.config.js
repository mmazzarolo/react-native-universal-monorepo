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
    publicPath: '/assets/dir1/dir2/dir3',
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  server: {
    enhanceMiddleware: (middleware, server) => {
      return (req, res, next) => {
        if(req.url.startsWith("/assets/dir1/dir2/dir3")){
          req.url = req.url.replace('/assets/dir1/dir2/dir3', '/assets');
        }else if(req.url.startsWith("/assets/dir1/dir2")){
          req.url = req.url.replace('/assets/dir1/dir2', '/assets/..');
        }else if(req.url.startsWith("/assets/dir1")){
          req.url = req.url.replace('/assets/dir1', '/assets/../..');
        }else if(req.url.startsWith("/assets")){
          req.url = req.url.replace('/assets', '/assets/../../..');
        }
        return middleware(req, res, next);
      };
    },
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
