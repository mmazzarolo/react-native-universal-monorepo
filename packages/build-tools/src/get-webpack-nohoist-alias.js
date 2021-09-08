const path = require('path');
const { getNohoistedPackages } = require("./get-nohoisted-packages");

// Get a set of webpack's "alias" compatible with our monorepo nohoist approach 
// (so that nohoisted dependencies are always forcefully resolved from the 
// project directory). 
function getWebpackNohoistAlias(dir) {
  const nohoistedPackages = getNohoistedPackages();
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
