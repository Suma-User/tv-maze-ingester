/* eslint-disable no-await-in-loop */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */

const findComponents = require('./find-components');

module.exports = async (paths, app) => {
  const loaderFiles = findComponents(paths, '*.loader.js');
  try {
    for (const loaderFile of loaderFiles) {
      const component = require(loaderFile);
      if (component && component.initialize) {
        await component.initialize(paths);
      } else {
        await component(paths, app);
      }
    }
  } catch (error) {
    throw error;
  }
};
