/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const Path = require('path');

module.exports = async (files) => {
  try {
    const dataMap = {};
    files.forEach((file) => {
      const paths = file.toString().replace('src/api/', '').split('/');

      if (paths.length >= 1) {
        const fileName = paths[paths.length - 1];
        const version = paths[0];
        const validation = fileName.split('.')[0];

        if (dataMap?.[version] && dataMap?.[version][validation]) {
          throw new Error(
            `Duplicate file name ${file} found. All service/validation file names should be unique.`,
          );
        }
        if (!dataMap[version]) {
          dataMap[version] = { [validation]: require(Path.resolve(file.toString())) };
        } else {
          dataMap[version][validation] = require(Path.resolve(file.toString()));
        }
      } else {
        throw new Error(
          `API Validation/Service folder not following convention. API services should follow src/api/api-version conventions`,
        );
      }
    });
    return dataMap;
  } catch (error) {
    throw error;
  }
};
