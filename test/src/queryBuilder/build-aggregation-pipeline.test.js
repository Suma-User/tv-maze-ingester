const { expect } = require('chai');
const sinon = require('sinon');
const buildAggregationPipeline = require('../../../src/queryBuilder/build-aggregation-pipeline.query');

describe('buildAggregationPipeline', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a pipeline with the correct structure for a given page, limit, sort, and skip parameters', () => {
    const page = 2;
    const limit = 5;
    const sort = { 'person.birthday': -1 };
    const skip = (page - 1) * limit;

    const result = buildAggregationPipeline({ page, limit, sort, skip });

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(4);

    expect(result[0]).to.deep.equal({
      $lookup: {
        from: 'cast',
        let: { showCast: '$cast' },
        pipeline: [
          { $match: { $expr: { $in: ['$_id', '$$showCast'] } } },
          { $sort: sort },
          {
            $project: {
              id: '$person.id',
              name: '$person.name',
              birthday: '$person.birthday',
            },
          },
        ],
        as: 'Cast',
      },
    });

    expect(result[1]).to.deep.equal({
      $project: {
        id: '$id',
        name: 1,
        cast: '$Cast',
      },
    });

    expect(result[2]).to.deep.equal({ $skip: skip });

    expect(result[3]).to.deep.equal({ $limit: limit });
  });

  it('should handle page=1 correctly (no skipping)', () => {
    const page = 1;
    const limit = 10;
    const sort = { 'person.birthday': -1 };
    const skip = (page - 1) * limit;

    const result = buildAggregationPipeline({ page, limit, sort, skip });

    expect(result[2]).to.deep.equal({ $skip: 0 });
  });

  it('should handle limit=0 correctly (no limiting)', () => {
    const page = 1;
    const limit = 0;
    const sort = { 'person.birthday': -1 };
    const skip = (page - 1) * limit;

    const result = buildAggregationPipeline({ page, limit, sort, skip });

    expect(result[3]).to.deep.equal({ $limit: 0 });
  });

  it('should handle negative page or limit values gracefully', () => {
    const page = -1;
    const limit = -5;
    const sort = { 'person.birthday': -1 };
    const skip = (page - 1) * limit;

    const result = buildAggregationPipeline({ page, limit, sort, skip });


    expect(result[2]).to.deep.equal({ $skip: 10 });

  });

  it('should correctly project the cast fields', () => {
    const page = 1;
    const limit = 5;
    const sort = { 'person.birthday': -1 };
    const skip = (page - 1) * limit;

    const result = buildAggregationPipeline({ page, limit, sort, skip });

    const lookupPipeline = result[0].$lookup.pipeline;
    const projectStage = lookupPipeline.find(stage => stage.$project);

    expect(projectStage).to.deep.equal({
      $project: {
        id: '$person.id',
        name: '$person.name',
        birthday: '$person.birthday',
      },
    });
  });
});