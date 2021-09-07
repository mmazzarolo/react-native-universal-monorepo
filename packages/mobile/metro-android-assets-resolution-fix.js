// Unfortunately there's an issue with assets resolution on android when 
// importing assets from path outside of the project's root directory.
// To fix it, we can patch metro's `publicPath` and `enhanceMiddleware` to
// allow reading from `n` depths below the project directory.
// For our use case, "3" is enough (to account for `../core/src`) but you might 
// wanna bump it up if you need to shuffle the assets location.  
// For more info, see this metro comment: 
// https://github.com/facebook/metro/issues/290#issuecomment-543746458

function getAndroidAssetsResolutionFix(params = {}) {
  const { depth = 3 } = params;
  let publicPath = generateAssetsPath(depth, 'dir');
  const applyMiddleware = (middleware) => {
    return (req, res, next) => {
      for (let currentDepth = depth; currentDepth >= 0; currentDepth--) {
        const pathToReplace = generateAssetsPath(currentDepth, 'dir');
        const replacementPath = generateAssetsPath(depth - currentDepth, '..');
        if (currentDepth === depth) {
          publicPath = pathToReplace;
        }
        if (req.url.startsWith(pathToReplace)) {
          req.url = req.url.replace(pathToReplace, replacementPath);
          break;
        }
      }
      return middleware(req, res, next);
    };
  };
  return {
    publicPath,
    applyMiddleware
  }
}

function generateAssetsPath (depth, subpath) {
  return `/assets`.concat(
    Array.from({ length: depth })
      .map((_, i) => `/${subpath}`)
      .join("")
  );
}

module.exports = {
  getAndroidAssetsResolutionFix
}