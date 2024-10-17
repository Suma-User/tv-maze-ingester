
module.exports = async (objectMap, type) => {
  let route;
  const _service = {};
  try {
    Object.keys(objectMap).forEach((version) => {
      Object.keys(objectMap[version]).forEach((service) => {
        Object.keys(objectMap[version][service]).forEach((method) => {
          const _method = objectMap[version][service][method];
          if (_method) {
            if (type === 'SERVICE') {
              if (typeof _method === 'function') {
                route = `${version}.${service}.${method}`;
                _service[route] = _method;
              }
            } else if (type === 'VALIDATION') {
              route = `${version}.${service}.${method}`;
              _service[route] = _method;
            }
          }
        });
      });
    });
  } catch (error) {
    throw error;
  }
  return _service;
};
