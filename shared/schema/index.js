/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const findComponents = require('../loader/find-components');
const { getComponentFileName } = require('../util/file.util');

const PATTERN = '*.schema.js';
const schemas = {};

const files = findComponents([__dirname], PATTERN);
files.forEach((file) => {
  const fileName = getComponentFileName(file, PATTERN);
  schemas[fileName] = require(file);
});
module.exports = schemas;
