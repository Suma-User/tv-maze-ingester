
const { expect } = require('chai');
const Enums = require('../../.././../shared/enums/constants/httpResponsesEnums.constant');

describe('HTTP Status Code Enums', () => {
  describe('Informational', () => {
    it('should be an object', () => {
      expect(Enums.Informational).to.be.an('object');
    });

    it('should contain expected status codes', () => {
      expect(Enums.Informational).to.have.property('Continue', 100);
      expect(Enums.Informational).to.have.property('SwitchingProtocols', 101);
      expect(Enums.Informational).to.have.property('Processing', 102);
    });
  });

  describe('Success', () => {
    it('should be an object', () => {
      expect(Enums.Success).to.be.an('object');
    });

    it('should contain expected status codes', () => {
      expect(Enums.Success).to.have.property('OK', 200);
      expect(Enums.Success).to.have.property('Created', 201);
      expect(Enums.Success).to.have.property('Accepted', 202);
      expect(Enums.Success).to.have.property('NoContent', 204);
      expect(Enums.Success).to.have.property('ResetContent', 205);
      expect(Enums.Success).to.have.property('PartialContent', 206);
    });
  });

  describe('Redirection', () => {
    it('should be an object', () => {
      expect(Enums.Redirection).to.be.an('object');
    });

    it('should contain expected status codes', () => {
      expect(Enums.Redirection).to.have.property('MultipleChoices', 300);
      expect(Enums.Redirection).to.have.property('MovedPermanently', 301);
      expect(Enums.Redirection).to.have.property('Found', 302);
      expect(Enums.Redirection).to.have.property('SeeOther', 303);
      expect(Enums.Redirection).to.have.property('NotModified', 304);
    });
  });

  describe('ClientError', () => {
    it('should be an object', () => {
      expect(Enums.ClientError).to.be.an('object');
    });

    it('should contain expected status codes', () => {
      expect(Enums.ClientError).to.have.property('BadRequest', 400);
      expect(Enums.ClientError).to.have.property('Unauthorized', 401);
      expect(Enums.ClientError).to.have.property('PaymentRequired', 402);
      expect(Enums.ClientError).to.have.property('Forbidden', 403);
      expect(Enums.ClientError).to.have.property('NotFound', 404);
    });
  });

  describe('ServerError', () => {
    it('should be an object', () => {
      expect(Enums.ServerError).to.be.an('object');
    });

    it('should contain expected status codes', () => {
      expect(Enums.ServerError).to.have.property('InternalServerError', 500);
      expect(Enums.ServerError).to.have.property('NotImplemented', 501);
      expect(Enums.ServerError).to.have.property('BadGateway', 502);
      expect(Enums.ServerError).to.have.property('ServiceUnavailable', 503);
      expect(Enums.ServerError).to.have.property('GatewayTimeout', 504);
    });
  });
});