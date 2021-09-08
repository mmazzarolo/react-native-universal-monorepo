function getNohoistedPackages() {
  const monorepoRootPackageJson = require("../../../package.json");
  const nohoistedPackages = monorepoRootPackageJson.workspaces.nohoist
    .filter((packageNameGlob) => !packageNameGlob.endsWith("**"))
    .map((packageNameGlob) => packageNameGlob.substring(3));
  return nohoistedPackages;
}

module.exports = {
  getNohoistedPackages,
};
