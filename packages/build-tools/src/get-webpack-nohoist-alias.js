const path = require('path');
const { getNohoistLibraries } = require("./get-nohoist-libraries");

// Get a webpack's "alias" setting compatible with our monorepo nohoist approach 
// (so that nohoist dependencies are always forcefully resolved from the 
// project directory). 
function getWebpackNohoistAlias(dir) {
  const nohoistedPackages = getNohoistLibraries();
  const alias = {};
  nohoistedPackages.forEach((packageName) => {
    alias[packageName] =
      packageName === "react-native"
        ? path.resolve(dir, "./node_modules/react-native-web")
        : path.resolve(dir, `./node_modules/${packageName}`);
  });
  return alias;
}

module.exports = {
  getWebpackNohoistAlias,
};
