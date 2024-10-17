const { expect } = require('chai');
const sortBuilder = require('../../../src/queryBuilder/sort-builder.query');

describe('sortBuilder', function () {
  it('should create a sort object with a single key', function () {
    const result = sortBuilder([{ key: 'name', isAscending: true }]);
    expect(result).to.deep.equal({ name: 1 });
  });

  it('should create a sort object with multiple keys', function () {
    const result = sortBuilder([
      { key: 'id', isAscending: false },
      { key: 'name', isAscending: true },
    ]);
    expect(result).to.deep.equal({ id: -1, name: 1 });
  });

  it('should handle an empty array of sort keys', function () {
    const result = sortBuilder([]);
    expect(result).to.deep.equal({});
  });
});
