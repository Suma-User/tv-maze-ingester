const convertToCamelCase = (value) => {
  return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};
const capitalize = (value) => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

module.exports = {
  convertToCamelCase,
  capitalize,
};
