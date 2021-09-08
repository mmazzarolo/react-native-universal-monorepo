const path = require("path");
const { getNohoistLibraries } = require("./get-nohoist-libraries");

// Get a set of metro's "extraNodeModules" and "blockList" settings compatible
// with our monorepo nohoist approach (so that nohois dependencies are
// always forcefully resolved from the project directory). 
function getMetroNohoistSettings({
  dir,
  workspaceName,
  reactNativeAlias,
} = {}) {
  const nohoistedPackages = getNohoistLibraries();
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
