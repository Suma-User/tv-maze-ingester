const findComponents = require('./find-components');
const injector = require('../injector')();
const flattenObjectMapper = require('./flatten-object-mapper');
const serviceFIleMap = require('./service-file-map');

module.exports = async () => {
  try {
    const files = findComponents(['**/**/api/**'], '*.service.js');
    const serviceMap = await serviceFIleMap(files);
    injector.register('serviceMap', await flattenObjectMapper(serviceMap, 'SERVICE'));
  } catch (error) {
    throw error;
  }
};
