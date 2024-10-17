
const folderLoader = require('./folder-loader');
const injector = require('../injector')();

const LOADER_PATTERN = '*.query.js';

module.exports = async (paths) => {
  const _paths = paths || injector.resolve('paths') || [];
  const data = folderLoader(_paths, LOADER_PATTERN, {
    convertFileToCamelCase: true,
  });

  injector.register('queryBuilder', data.queryBuilder || {});
};
