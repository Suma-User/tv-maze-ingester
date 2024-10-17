/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const findComponents = require('./find-components');
const { getComponentFileName } = require('../util/file.util');
const { convertToCamelCase } = require('../util/string.util');

module.exports = (paths, pattern, options = {}) => {
  const fileKey = {};
  const files = findComponents(paths, pattern);

  files.forEach((file) => {
    let fileName = getComponentFileName(file, pattern);
    if (options.convertFileToCamelCase) {
      fileName = convertToCamelCase(fileName);
    }
    fileKey[fileName] = require(file);
  });
  return fileKey;
};
