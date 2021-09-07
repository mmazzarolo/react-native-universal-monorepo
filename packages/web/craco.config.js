const path = require("path");
const { getLoader, loaderByName, whenDev } = require("@craco/craco");
const webpack = require("webpack");

const absolutePath = path.join(__dirname, "../core");

module.exports = {
  webpack: {
    alias: {},
    plugins: [new webpack.DefinePlugin({ __DEV__: whenDev(() => true, false) })],
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[absolutePath];
      }
      return webpackConfig;
    },
  },
};
