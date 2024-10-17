const _ = require('lodash');

const DEFAULT_NAMESPACE = '_root';

const items = {};

module.exports = () => {
  if (!items._root) {
    items._root = {};
  }

  const injector = {
    register: (key, value) => {
      items[DEFAULT_NAMESPACE][_.trim(key)] = {
        value,
      };
    },
    resolve: (key) => {
      return items[DEFAULT_NAMESPACE][_.trim(key)]
        ? items[DEFAULT_NAMESPACE][_.trim(key)].value
        : {};
    },
    list: (ns = DEFAULT_NAMESPACE) => {
      if (!items[ns]) {
        return [];
      }
      return _.map(_.keys(items[ns]), (key) => {
        return {
          key,
          value: items[ns][key].value,
        };
      });
    },
  };

  injector.register('injector', injector);

  _.forEach(items, (val, key) => {
    if (key !== DEFAULT_NAMESPACE) {
      injector.register(key, val);
    }
  });

  return injector;
};
