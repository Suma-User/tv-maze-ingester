const injector = require('../injector')();
const {
  constants: { httpResponsesEnums },
} = require('../enums');

const getRoutePath = require('../util/get-route-path');

module.exports = async (request, response, next) => {
  try {
    const serviceAuth = injector.resolve('serviceAuth');
    const { routePath, routeIdPath } = await getRoutePath(request);
    console.info(`authorization-handler:request.params:${JSON.stringify(request.params)}`);

    const routeServiceAuth =
      routeIdPath && serviceAuth[routeIdPath] ? serviceAuth[routeIdPath] : serviceAuth[routePath];

    if (!routeServiceAuth) {
      throw new Error('Requested route not found.');
    }
    return next();
  } catch (error) {
    console.error(error);
    response.status(httpResponsesEnums.ClientError.NotFound);
    return next(error.message);
  }
};
