/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const { getComponentFileName, getComponentFolderName } = require('../util/file.util');
const { convertToCamelCase } = require('../util/string.util');
const findComponents = require('./find-components');

module.exports = (paths, pattern, options = {}) => {
  const folderKey = {};
  const files = findComponents(paths, pattern);
  files.forEach((file) => {
    const folderName = getComponentFolderName(file);
    let fileName = getComponentFileName(file, pattern);

    if (options.convertFileToCamelCase) {
      fileName = convertToCamelCase(fileName);
    }
    if (folderName && !folderKey[folderName]) {
      folderKey[folderName] = {};
    }
    folderKey[folderName][fileName] = require(file);
  });
  return folderKey;
};
