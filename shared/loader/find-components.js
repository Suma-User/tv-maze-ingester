
const fg = require('fast-glob');
const _ = require('lodash');
const normalize = require('normalize-path');

module.exports = (paths = [__dirname], pattern = '*.loader.js') => {
  const filePaths = (typeof paths === 'string' ? [paths] : paths).map((fp) => {
    return normalize(`${fp}/**/${pattern}`);
  });
  const _data = _.uniq(_.flatten(fg.sync(filePaths)).sort()).filter((path) => {
    return !path.includes('/test/');
  });

  return _data;
};
