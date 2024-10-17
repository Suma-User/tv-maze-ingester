
const folderLoader = require('./folder-loader');
const injector = require('../injector')();

const LOADER_PATTERN = '*.processor.js';

module.exports = async (paths) => {
  const _paths = paths || injector.resolve('paths') || [];
  const data = folderLoader(_paths, LOADER_PATTERN, {
    convertFileToCamelCase: true,
  });
  injector.register('processor', data.processor || {});
};
