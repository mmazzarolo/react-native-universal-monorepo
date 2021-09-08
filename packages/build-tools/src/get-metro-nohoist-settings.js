const path = require("path");
const { getNohoistedPackages } = require("./get-nohoisted-packages");

// Get a set of metro's "extraNodeModules" and "blockList" settings compatible
// with our monorepo nohoist approach (so that nohoisted dependencies are
// always forcefully resolved from the project directory). 
function getMetroNohoistSettings({
  dir,
  workspaceName,
  reactNativeAlias,
} = {}) {
  const nohoistedPackages = getNohoistedPackages();
  const blockList = [];
  const extraNodeModules = {};
  nohoistedPackages.forEach((packageName) => {
    extraNodeModules[packageName] =
      reactNativeAlias && packageName === "react-native"
        ? path.resolve(dir, `./node_modules/${reactNativeAlias}`)
        : path.resolve(dir, `./node_modules/${packageName}`);
    const regexSafePackageName = packageName.replace("/", "\\/");
    blockList.push(
      new RegExp(
        `^((?!${workspaceName}).)*\\/node_modules\\/${regexSafePackageName}\\/.*$`
      )
    );
  });
  return { extraNodeModules, blockList };
}

module.exports = {
  getMetroNohoistSettings,
};
