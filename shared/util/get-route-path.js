const {
  constants: {
    api: { API_VERSION },
  },
} = require('../enums');

module.exports = async (request) => {
  const httpMethod = request.method.toLowerCase();
  let { service } = request.params;
  const { action, id } = request.params;
  const apiVersion = request?.headers[`x-api-version`];
  const version = API_VERSION[apiVersion || '1.0.0'];
  if (!version) {
    let routePath;
    let routeIdPath;
    let allRoutePath;

    //  TODO: According to the version in the request create route path for the api

    if (service) {
      routePath = `${service}`;
    }
    if (!action) {
      routePath = `${service}.${httpMethod}`;
      allRoutePath = `all.${httpMethod}`;
    } else if (action && !id) {
      routePath = `${service}.${action}.${httpMethod}`;
      allRoutePath = `all.${action}.${httpMethod}`;
      routeIdPath = `${service}.${httpMethod}id`;
    } else if (action && id) {
      routePath = `${service}.${action}.${httpMethod}id`;
      allRoutePath = `all.${action}.${httpMethod}id`;
    }
    return { routePath, routeIdPath, allRoutePath };
  }
  let routePath;
  let routeIdPath;
  let allRoutePath;

  if (service) {
    service = service === 'mobility' ? id : service;
    // console.log('service===>',service)
    routePath = `${version}.${service}`;
  }
  if (!action) {
    routePath = `${version}.${service}.${httpMethod}`;
    allRoutePath = `all.${httpMethod}`;
  } else if (action && !id) {
    routePath =
      action === 'auto'
        ? `${version}.${service}.${httpMethod}`
        : `${version}.${service}.${action}.${httpMethod}`;
    allRoutePath = `all.${action}.${httpMethod}`;
    routeIdPath = `${version}.${service}.${httpMethod}id`;
  } else if (action && id) {
    routePath =
      action === 'auto'
        ? `${version}.${service}.${httpMethod}`
        : `${version}.${service}.${action}.${httpMethod}id`;
    // console.log('routePath2===>',routePath)

    allRoutePath = action === 'auto' ? `all.${httpMethod}id` : `all.${action}.${httpMethod}id`;
  }
  return { routePath, routeIdPath, allRoutePath };
};
