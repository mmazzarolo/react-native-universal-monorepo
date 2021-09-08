// Extract the libraries added to the "nohoist" section of the monorepo's root
// package.json.
function getNohoistLibraries() {
  const monorepoRootPackageJson = require("../../../package.json");
  const nohoistedPackages = monorepoRootPackageJson.workspaces.nohoist
    .filter((packageNameGlob) => !packageNameGlob.endsWith("**"))
    .map((packageNameGlob) => packageNameGlob.substring(3));
  return nohoistedPackages;
}

module.exports = {
  getNohoistLibraries,
};
