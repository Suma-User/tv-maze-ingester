const fileLoader = require('../../loader/file-loader');

const PATTERN = '*.constants.js';

module.exports = fileLoader([__dirname], PATTERN);
