
const findComponents = require('./find-components');
const injector = require('../injector')();
const {
  constants: { common: commonConstants },
} = require('../enums');
const serviceFileMap = require('./service-file-map');

const LOADER_PATTERN = '*.auth.js';
module.exports = async () => {
  try {
    const authFiles = findComponents(['**/api/**'], LOADER_PATTERN);
    const objectMap = await serviceFileMap(authFiles);
    const serviceAuth = {};
    Object.keys(objectMap).forEach((authVersion) => {
      Object.keys(objectMap[authVersion]).forEach((authService) => {
        Object.keys(objectMap[authVersion][authService]).forEach((service) => {
          Object.keys(objectMap[authVersion][authService][service])
            .filter((c) => c !== 'description')
            .forEach((method) => {
              const _method = objectMap[authVersion][authService][service][method];
              if (commonConstants.ALLOWED_HTTP_METHODS.includes(method)) {
                if (serviceAuth[`${authVersion}.${service}.${method}`]) {
                  throw new Error('Duplicate Service endpoint added');
                }
                serviceAuth[`${authVersion}.${service}.${method}`] = _method;
              } else {
                Object.keys(_method).forEach((action) => {
                  const _action = _method[action];
                  if (_action && commonConstants.ALLOWED_HTTP_METHODS.includes(action)) {
                    if (serviceAuth[`${authVersion}.${service}.${method}.${action}`]) {
                      throw new Error('Duplicate Service endpoint added');
                    }
                    serviceAuth[`${authVersion}.${service}.${method}.${action}`] = _action;
                  }
                });
              }
            });
        });
      });
    });
    injector.register('serviceAuth', serviceAuth);
  } catch (error) {
    throw error;
  }
};
