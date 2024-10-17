const fileLoader = require('../loader/file-loader');

const PATTERN = '*.constant.js';

module.exports = fileLoader([__dirname], PATTERN);
