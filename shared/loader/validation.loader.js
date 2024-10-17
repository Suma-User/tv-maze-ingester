const findComponents = require('./find-components');
const injector = require('../injector')();
const flattenObjectMapper = require('./flatten-object-mapper');
const serviceFIleMap = require('./service-file-map');

const LOADER_PATTERN = '*.validation.js';

module.exports = async () => {
  try {
    const files = findComponents(['**/api/**/validations'], LOADER_PATTERN);
    const validationMap = await serviceFIleMap(files);
    injector.register('validationMap', await flattenObjectMapper(validationMap, 'VALIDATION'));
  } catch (error) {
    throw error;
  }
};
