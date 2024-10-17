const { expect } = require('chai');
const constants = require('../../../../shared/enums/constants/common.constant');

describe('Constants ENUM', () => {
  describe('ALLOWED_HTTP_METHODS', () => {
    it('should be an array', () => {
      expect(constants.ALLOWED_HTTP_METHODS).to.be.an('array');
    });

    it('should contain 9 HTTP methods', () => {
      expect(constants.ALLOWED_HTTP_METHODS).to.have.lengthOf(9);
    });

    it('should contain common HTTP methods', () => {
      const commonMethods = ['get', 'post', 'delete', 'put', 'options'];
      commonMethods.forEach((method) => {
        expect(constants.ALLOWED_HTTP_METHODS).to.include(method);
      });
    });

    it('should contain custom id-based HTTP methods', () => {
      const customMethods = ['getid', 'postid', 'deleteid', 'putid'];
      customMethods.forEach((method) => {
        expect(constants.ALLOWED_HTTP_METHODS).to.include(method);
      });
    });
  });

  describe('ANONYMOUS_ACCESS', () => {
    it('should be a string', () => {
      expect(constants.ANONYMOUS_ACCESS).to.be.a('string');
    });

    it('should equal "Anonymous"', () => {
      expect(constants.ANONYMOUS_ACCESS).to.equal('Anonymous');
    });
  });
});



