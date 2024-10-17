
const loadsh = require('lodash');

const DEFAULT_LIMIT = 10;
const DEFAULT_SORT_DIRECTION = -1;
const DEFAULT_PAGE = 1;

const sortKeyMap = {
  'birthday': 'person.birthday',
};

const sortBuilder = (sortKeys) => {
  const sortObject = {};

  sortKeys.forEach(({ key, isAscending }) => {
    const sortDirection = isAscending ? 1 : -1;
    const mappedKey = sortKeyMap[key] || key; // Use mapped key if available, otherwise use the original key
    sortObject[mappedKey] = sortDirection;
  });

  return sortObject;
};

const getSortOptions = options => {
  const { search, page, limit, sortBy, sortDirection } = options;

  const sortByArray = Array.isArray(sortBy) ? sortBy : [sortBy].filter(Boolean);
  const sortDirectionArray = Array.isArray(sortDirection) 
    ? sortDirection.map(dir => parseInt(dir, 10))
    : [parseInt(sortDirection, 10) || DEFAULT_SORT_DIRECTION];

  const sortKeys = sortByArray.map((key, index) => ({
    key,
    isAscending: sortDirectionArray[index] === 1
  }));

  let sortObject = sortBuilder(sortKeys);

  if(loadsh.isEmpty(sortObject)){
    sortObject = {'person.birthday' : -1 };
  }

  let parsedPage = parseInt(page, 10);
  parsedPage = (Number.isNaN(parsedPage) || parsedPage < 1) ? DEFAULT_PAGE : parsedPage;

  let parsedLimit = parseInt(limit, 10);
  parsedLimit = (Number.isNaN(parsedLimit) || parsedLimit < 1) ? DEFAULT_LIMIT : parsedLimit;

  return {
    search,
    paginationOptions: {
      page: parsedPage,
      limit: parsedLimit,
      skip: (parsedPage - 1) * parsedLimit
    },
    sortOption: sortObject
  };
};

module.exports = getSortOptions;