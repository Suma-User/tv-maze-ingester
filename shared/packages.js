/* eslint-disable global-require */

module.exports = {
  app: require('express')(),
  express: require('express'),
  path: require('path'),
  folderLoader: require('./loader/folder-loader'),
  fileLoader: require('./loader/file-loader'),
  findComponents: require('./loader/find-components'),
  injector: require('./injector')(),
  bodyParser: require('body-parser'),
  helmet: require('helmet'),
  mongoose: require('mongoose'),
  fs: require('fs').promises,
};
