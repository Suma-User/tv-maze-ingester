
const injector = require('../injector')();
const responseHandler = require('./response.handler');
const errorHandler = require('./error.handler');
const getRoutePath = require('../util/get-route-path');

module.exports = async (request, response) => {
  const context = {
    request,
    response,
  };
  let result;
  let routePath;
  let routeIdPath;
  let allRoutePath;
  try {
    const flattenedService = injector.resolve('serviceMap');

    const flattenedValidation = injector.resolve('validationMap');
    const httpMethod = request.method.toLowerCase();
    ({ routePath, routeIdPath, allRoutePath } = await getRoutePath(request));
    context.routePath = routePath || routeIdPath;
    context.allRoutePath = allRoutePath;
    if (routeIdPath) {
      const { action, ...otherParams } = request.params;
      request.params = {
        id: action,
        ...otherParams,
      };
    }
    const params = {
      method: httpMethod,
      context: {
        user: request.userDetails,
        token: request.token,
        entityDetails: request.entityDetails,
        subscriptionPlan: request.subscriptionPlan,
      },
      query: request.query,
      body: request.body || {},
      request,
      response,
    };
    if (
      !flattenedService[routePath] &&
      (!routeIdPath || (routeIdPath && !flattenedService[routeIdPath]))
    ) {
      return errorHandler(
        {
          message: 'Service Request Method is not supported',
          statusCode: 404,
        },
        context,
      );
    }
    let payload = {};
    if (Object.keys(params.body).length) {
      payload = params.body;
    } else if (Object.keys(params.query).length) {
      payload = params.query;
    }
    if (flattenedValidation[routePath || routeIdPath]) {
      await flattenedValidation[routePath || routeIdPath].validate(payload, {
        abortEarly: true,
      });
    }
    result = await (
      flattenedService[routePath] ? flattenedService[routePath] : flattenedService[routeIdPath]
    )(params);
  } catch (error) {
    return errorHandler(error, context);
  }

  return responseHandler(context, result);
};
