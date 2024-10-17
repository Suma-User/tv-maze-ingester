const { expect } = require('chai');
const sinon = require('sinon');
const { injector } = require('shared');
const showService = require('../../../../src/api/v1.0/get-shows.service');

describe('showService', () => {
  let injectorStub;
  let processorStub;
  let queryBuilderStub;

  beforeEach(() => {
    processorStub = {
      getShowsWithCast: sinon.stub(),
    };
    queryBuilderStub = {
      buildAggregationPipeline: sinon.stub(),
    };
    injectorStub = sinon.stub(injector, 'resolve');
    injectorStub.withArgs('processor').returns(processorStub);
    injectorStub.withArgs('queryBuilder').returns(queryBuilderStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('get', () => {
    it('should return shows with cast data', async () => {
      const query = {
        page: 1,
        limit: 10,
      };
      
      const showsWithCast = [
        {
          _id: '670d6bb50771cf6c9d5a057b',
          name: 'Gotham',
          id: 11,
          cast: [
            {
              _id: '670d6bb50771cf6c9d5a0582',
              id: 2183,
              name: 'David Mazouz',
              birthday: '2001-02-19T00:00:00.000Z',
            },
            {
              _id: '670d6bb50771cf6c9d5a058c',
              id: 2188,
              name: 'Camren Renee Bicondova',
              birthday: '1999-05-22T00:00:00.000Z',
            },
          ],
        },
      ];

      processorStub.getShowsWithCast.resolves(showsWithCast);

      const result = await showService.get({ query });
      expect(result).to.deep.equal(showsWithCast);
    });

    it('should throw an error if something goes wrong', async () => {
      const query = {
        sort: 'name',
        page: 1,
        limit: 10,
      };
      
      const error = new Error('Something went wrong');

      processorStub.getShowsWithCast.rejects(error);

      try {
        await showService.get({ query });
        throw new Error('Expected error was not thrown');
      } catch (err) {
        expect(err.message).to.equal('Something went wrong');
      }
    });
  });
});