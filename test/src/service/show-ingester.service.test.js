const { expect } = require('chai');
const sinon = require('sinon');
const { Worker } = require('worker_threads');
const path = require('path');
const ShowIngestor = require('../../../src/service/showIngester');
const APIRequestLib = require('shared/util/api-request-lib');

describe('ShowIngestor', () => {
  let showIngestor;
  let entityManagerStub;
  let cacheStub;
  let apiClientStub;

  beforeEach(() => {
    entityManagerStub = {
      show: {
        findOneAndUpdate: sinon.stub(),
        findByIdAndUpdate: sinon.stub(),
      },
      cast: {
        findOneAndUpdate: sinon.stub(),
      },
    };
    cacheStub = {
      save: sinon.stub(),
    };
    apiClientStub = sinon.createStubInstance(APIRequestLib);

    showIngestor = new ShowIngestor('http://example.com', entityManagerStub, cacheStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('startIngestion', () => {
    it('should call runIngestorWorker for each batch', async () => {
      sinon.stub(showIngestor, 'runIngestorWorker').resolves();
      await showIngestor.startIngestion();

      expect(showIngestor.runIngestorWorker.callCount).to.equal(10);
      expect(showIngestor.runIngestorWorker.firstCall.calledWith(1, 10)).to.be.true;
      expect(showIngestor.runIngestorWorker.lastCall.calledWith(91, 100)).to.be.true;
    });

    it('should log an error if a batch fails', async () => {
      const error = new Error('Test Error');
      sinon.stub(showIngestor, 'runIngestorWorker').onFirstCall().rejects(error).resolves();
      const consoleErrorStub = sinon.stub(console, 'error');

      await showIngestor.startIngestion();

      expect(consoleErrorStub.calledWith('Error in batch 1-10:', error.message)).to.be.true;
    });
  });

  describe('runIngestorWorker', () => {

    it('should reject if worker exits with a non-zero code', async () => {
      const workerOnStub = sinon.stub();
      const workerExitStub = sinon.stub();

      sinon.stub(Worker.prototype, 'on').callsFake((event, callback) => {
        if (event === 'exit') {
          workerExitStub.returns(callback(1));
        }
      });

      try {
        await showIngestor.runIngestorWorker(1, 10);
        throw new Error('Expected rejection did not occur');
      } catch (error) {
        expect(error.message).to.equal('Worker stopped with exit code 1');
      }
    });
  });

  describe('processShowData', () => {
    it('should update show and cast data', async () => {
      const showData = {
        id: 1,
        _embedded: {
          cast: [
            {
              person: { id: 101 },
              character: { id: 201 },
              self: false,
              voice: true,
            },
          ],
        },
      };

      entityManagerStub.show.findOneAndUpdate.resolves({ _id: 'showId' });
      entityManagerStub.cast.findOneAndUpdate.resolves({ _id: 'castId' });

      await showIngestor.processShowData(showData);

      expect(entityManagerStub.show.findOneAndUpdate.calledOnce).to.be.true;
      expect(entityManagerStub.cast.findOneAndUpdate.calledOnce).to.be.true;
      expect(entityManagerStub.show.findByIdAndUpdate.calledOnce).to.be.true;
    });
  });
});