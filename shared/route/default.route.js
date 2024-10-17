const serviceHandler = require('../handlers/service.handler');
const routeNotFoundHandler = require('../handlers/route-not-found.handler');

module.exports = (
  app,
  handlers = [
    routeNotFoundHandler,
    serviceHandler,
  ],
) => {
  app.post('/:service/', handlers);
  app.post('/:service/:action', handlers);
  app.post('/:service/:action/:id', handlers);

  app.put('/:service', handlers);
  app.put('/:service/:action', handlers);
  app.put('/:service/:id', handlers);

  app.delete('/:service', handlers);
  app.delete('/:service/:id', handlers);

  app.get('/:service', handlers);
  app.get('/:service/:action', handlers);
  app.get('/:service/:action/:id', handlers);
};
