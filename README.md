# React Native Universal Monorepo (🚧 WIP)

A React Native monorepo boilerplate supporting multiple platforms: Android, iOS, macOS, Windows, web, browser extension, Electron.

&nbsp;

<p align="center" margin-bottom="0">
  <img width="820" height="auto" src="./.github/images/all-screenshot.png">
</p>

## Overview

This monorepo uses [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [TypeScript](https://www.typescriptlang.org/) to support a modular React Native project.  

To reduce redundancy, most package managers employ some kind of hoisting scheme to extract and flatten all dependent modules, as much as possible, into a centralized location.  
Yarn workspaces store the flattened dependencies in a `node_modules` directory in the project root and makes it accessible to the workspace packages by symlinking the libraries in the packages' `node_module` directory. 

While it might appear that we can access all modules from the project’s root `node_modules`, the reality is that build processes sometimes aren't able to traverse symlinks.  
This problem is especially prominent in React Native apps, where both the [metro bundler](https://github.com/facebook/metro/issues/1) and the native code can't follow symlinks.  

A common way to solve this issue in React Native monorepos, is to configure the metro bundler and the native layer to use the project's root `node_modules` directory instead of the package's one.  
While this approach ensures you gain all the benefits of the hoisting process, it introduces a few complexities:
- Each time you update React Native (or a library that requires native linking), you must also update (or at least keep in sync) the native code with the root project's `node_modules` directory. To me, this process have always seemed error prone, because you're dealing with multiple languages and build-tools.  
- Suppose your packages need different versions of React Native (or of a library that requires native linking). In that case, you can't easily ensure it will be installed in a specific location (unless you give up the hoisting mechanism) — adding even more complexities to the table.  

For these reasons, React Native Universal Monorepo uses a different approach, fully embracing [Yarn's `nohoist`](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/).  

Of course, this comes with drawbacks. The most obvious one is that nohoist modules could be duplicated in multiple locations, denying the benefit of hoisting mentioned above. Therefore, we'll keep `nohoist` scope as small and explicit as possible, targeting only problematic libraries.  

Thanks to nohoist, we can avoid making changes to the native code, and we can keep the monorepo configuration in the JavaScript land. This means we can even [extract common metro and webpack settings in a workspace package](https://github.com/mmazzarolo/react-native-universal-monorepo/tree/master/packages/build-tools/src) to share them easily across the entire project.  

Additionally, different platforms can use different versions of React Native (and native libraries), favoring incremental updates instead of migrating the entire project.

> Please notice that I'm not saying that this is the _right_ way to do React Native monorepos. It's just an approach that I enjoy using.  

## Supported platforms

- Android (React-Native 0.65)
- iOS (React-Native 0.65)
- Windows (React-Native 0.65)
- MacOS (React-Native 0.63)
- Web (React-Native 0.65)
- Web - Browser Extension (React-Native 0.65)
- Web - Electron (React-Native 0.65)

## Getting started

1. Clone the repository: `git@github.com:mmazzarolo/react-native-universal-monorepo.git`
2. Run yarn install `cd react-native-universal-monorepo && yarn`


> 🚧 I'm working on a blog post to explain how to get to this monorepo structure from scratch.  
> For now, if you're interested, please check the following guides:
> - [Run your React Native app on the web with React Native for Web
](https://mmazzarolo.com/blog/2020-10-24-adding-react-native-web/)
> - [Building a desktop application using Electron and Create React App](https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/)
> - [Developing a browser extension with Create React App](https://mmazzarolo.com/blog/2019-10-19-browser-extension-development/)

## Available commands

Development and build commands:

- `yarn android:metro`: Start the metro server for android/iOS
- `yarn android:start`: Start developing the android app
- `yarn android:studio`: Open the android app on android Studio
- `yarn ios:metro`: Start the metro server for android/iOS
- `yarn ios:start`: Start developing the iOS app
- `yarn ios:xcode`: Open the iOS app on XCode
- `yarn macos:metro`: Start the metro server for macOS
- `yarn macos:start`: Start developing the macOS app
- `yarn macos:xcode`: Open the macOS app on XCode
- `yarn web:start`: Start developing the web app
- `yarn web:build`: Create a production build of the web app
- `yarn electron:start`: Start developing the electron app
- `yarn electron:package:mac`: Package the production binary of the electron app for macOS
- `yarn electron:package:win`: Package the production binary of the electron app for windows
- `yarn electron:package:linux`: Package the production binary of the electron app for linux
- `yarn browser-ext:start`: Start developing the browser extension
- `yarn browser-ext:build`: Create a production build of the browser extension
- `yarn windows:metro`: Start the metro server for windows
- `yarn windows:start`: Start developing the windows app

Other commands (we use [ultra-runner](https://github.com/folke/ultra-runner) to run these commands on all workspaces): 

- `yarn lint`: Lint each project
- `yarn lint:fix`: Lint + fix each project
- `yarn test`: Run tests of each project
- `yarn typecheck`: Run the TypeScript type-checking on each project


## Native dependencies

While working on React Native in a monorepo, you'll notice that several packages won't work correctly when hoisted — either because they need to be natively linked or because they end up being bundled twice, breaking the build (e.g., `react`, `react-dom`).  
This is not an issue with the approach used in this project per se. It's more of a common problem with monorepos.  

To fix these issues, [we mark them as nohoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/), so they will be installed in each package that depends on them.  

In this monorepo, you can see an example of such libraries in `react-native-async-storage`.  

In the metro bundler and Webpack configs used across the monorepo, [I'm using a set of build-tools](https://github.com/mmazzarolo/react-native-universal-monorepo/tree/master/packages/build-tools) that ensures nohoisted packages are resolved correctly.  
So, as long as you add these libraries [to the `nohoist` list](https://github.com/mmazzarolo/react-native-universal-monorepo/blob/a7dcfcbe7c7df66f6d11f06dd13f51ff94b1e70c/package.json#L9-L19), you should be good to go 👍  
