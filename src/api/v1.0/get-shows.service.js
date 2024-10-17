/* eslint-disable-next-line padded-blocks */

const {
  injector,
} = require('shared');

const getSortOptions = require('../../util/sort-option');

module.exports = {
  get: async ({ query }) => {
    try {
    
      const {
        paginationOptions : { page , limit, skip },
        sortOption
      } = getSortOptions(query);

      console.log(skip);

      const processor = injector.resolve('processor');
      const queryBuilder = injector.resolve('queryBuilder');
      const pipeline = queryBuilder.buildAggregationPipeline({
        page: page,
        limit: limit,
        skip : skip,
        sort: sortOption,
      });
      const result = await processor.getShowsWithCast(pipeline);
      return result || [];
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong'); //TO DO add more granular error
    }
  },
};
