## [2.0.2](https://github.com/DisQada/PathFinder/compare/v2.0.1...v2.0.2) (2023-11-22)

### Bug Fixes

- fix types, references and imports ([b52ae45](https://github.com/DisQada/PathFinder/commit/b52ae457b2452d1e71ccf36e6a48cc85d35fdbb8))

## [2.0.1](https://github.com/DisQada/pathfinder/compare/v2.0.0...v2.0.1) (2023-09-07)

### Bug Fixes

- **exports:** export non-exported functions ([2ae1739](https://github.com/DisQada/pathfinder/commit/2ae1739dbbeab51aee6ebe6cdfa0c8dfbbcbbee5))
- **readers:** add missing modules ([30cb416](https://github.com/DisQada/pathfinder/commit/30cb416fc39f67128039fb9359a4161253d968f8))

# [2.0.0](https://github.com/DisQada/pathfinder/compare/v1.1.1...v2.0.0) (2023-07-20)

### Bug Fixes

- correct path referencing ([5e4552c](https://github.com/DisQada/pathfinder/commit/5e4552c5882f4a3e12ed53713707458ed81a20cd))
- **exports:** export helper/interfaces ([b8dc5cd](https://github.com/DisQada/pathfinder/commit/b8dc5cd78e09c720e751b168d40657face8685bc))

### Code Refactoring

- rename functions ([b4c4776](https://github.com/DisQada/pathfinder/commit/b4c4776a8ae74788468c7e0a145dab6c31b6c63a))

### Features

- **finder:** rewrite finder functions and move them to separate file ([e63cc6d](https://github.com/DisQada/pathfinder/commit/e63cc6d61463b189bb3418687050a11ab7ade343))
- **promise:** change saver/getFilePathsInFolder to a promise-based function ([475f315](https://github.com/DisQada/pathfinder/commit/475f31514582bcc3eb929c5849b9f1e2274d55ae))
- replace boolean parameter with object ([be55db9](https://github.com/DisQada/pathfinder/commit/be55db92164646ea20e35e8fba9f10461405e019))

### Performance Improvements

- **filepaths:** change filePaths type from Map<string, FilePath[]> to FilePath[] ([962ede1](https://github.com/DisQada/pathfinder/commit/962ede182f1c0f6ebaaf26d5f640f2efbcd5b8d9))

### BREAKING CHANGES

- Renamed the following functions (workspaceFolders =>
  readWorkspaceFolderNames),(savedFilePath => storedPath), (saveFilePaths => storePaths),
  (getFilePathsInFolder => readFolderPaths) and (storeFilePathsInFolder => storeFolderPaths)
- **finder:** Renamed functions (aFilePath => findPath) and (allFilePaths => findPaths), the
  functions now take an interface as parameter
- **promise:** the function getFilePathsInFolder is no longer exported
- Changed the parameter type in both functions in the saver file
- **filepaths:** Changed storage/getPaths return type from a map to an array and deleted the
  finder/allFilePaths function

## [1.1.1](https://github.com/DisQada/pathfinder/compare/v1.1.0...v1.1.1) (2023-04-26)

### Bug Fixes

- **package.json:** add exports.import option ([f3a19d9](https://github.com/DisQada/pathfinder/commit/f3a19d9832b557d15ff2d6e5dd8bff2cea26ff6e))
- **tsconfig:** remove deprecated option ([b731424](https://github.com/DisQada/pathfinder/commit/b7314245cd142a94eda28f223f959b12657d20dc))

# [1.1.0](https://github.com/DisQada/pathfinder/compare/v1.0.1...v1.1.0) (2023-04-26)

### Features

- **filepath:** add filepath constructor argument ([ea0609d](https://github.com/DisQada/pathfinder/commit/ea0609d6fc64ea05af35d9813b9964a11599b02c))

## [1.0.1](https://github.com/DisQada/pathfinder/compare/v1.0.0...v1.0.1) (2023-04-24)

### Bug Fixes

- **filepath:** change from default export to normal export ([e81998e](https://github.com/DisQada/pathfinder/commit/e81998e49d057c2f060963e7607edcee02c37a8a))

# 1.0.0 (2023-04-14)

### Bug Fixes

- **saver:** fixed import path ([a2df268](https://github.com/DisQada/pathfinder/commit/a2df268a6817d25d2cfaa42e84408825c10abbf2))

### Features

- First commit ([4eb92c3](https://github.com/DisQada/pathfinder/commit/4eb92c3585682e8aef8e49ff6625e7fc4c8e72c9))

# 1.0.0 (2023-04-10)

### Features

- First commit ([4eb92c3](https://github.com/DisQada/pathfinder/commit/4eb92c3585682e8aef8e49ff6625e7fc4c8e72c9))
