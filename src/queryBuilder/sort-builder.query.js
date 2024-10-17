const sortBuilder = (sortKeys) => {
  const sortObject = {};

  sortKeys.forEach(({ key, isAscending }) => {
    const sortDirection = isAscending ? 1 : -1;

    sortObject[key] = sortDirection;
  });

  return sortObject;
};

module.exports = sortBuilder;
