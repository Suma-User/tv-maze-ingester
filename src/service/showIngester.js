const { Worker } = require('worker_threads');
const path = require('path');
const APIRequestLib = require('shared/util/api-request-lib');

// TODO : caching for update last Fetched Data (maintain)
class ShowIngestor {
  constructor(apiBaseUrl, entityManager) {
    this.apiClient = new APIRequestLib(apiBaseUrl);
    this.entityManager = entityManager;
    this.batchSize = 10;
    this.totalShows = Number(process.env.TV_SHOW_SIZE) || 100;
  }

  async startIngestion() {
    for (let startId = 1; startId <= this.totalShows; startId += this.batchSize) {
      const endId = Math.min(startId + this.batchSize - 1, this.totalShows);
      console.log(`Starting ingestion for shows ${startId} to ${endId}`);
      try {
        await this.runIngestorWorker(startId, endId);
        console.log(`Completed ingestion for shows ${startId} to ${endId}`);
      } catch (error) {
        console.error(`Error in batch ${startId}-${endId}:`, error.message);
      }
    }
    console.log('All ingestion tasks completed');
  }

  runIngestorWorker(startId, endId) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, 'showIngesterWorker.js'), {
        workerData: { startId, endId },
      });

      worker.on('message', async (message) => {
        if (message.type === 'show_data') {
          await this.processShowData(message.data);
        }
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        } else {
          resolve();
        }
      });
    });
  }

  async processShowData(showData) {
    const { _embedded, ...showDetails } = showData;
    const show = await this.entityManager.show.findOneAndUpdate(
      { id: showDetails.id },
      { ...showDetails, id: showDetails.id },
      { upsert: true, new: true },
    );

    const castPromises = _embedded.cast.map(async (castMember) => {
      const cast = await this.entityManager.cast.findOneAndUpdate(
        {
          'person.id': castMember.person.id,
          'character.id': castMember.character.id,
          show: show._id,
        },
        {
          person: { ...castMember.person, tvMazeId: castMember.person.id },
          character: { ...castMember.character, tvMazeId: castMember.character.id },
          self: castMember.self,
          voice: castMember.voice,
          show: show._id,
        },
        { upsert: true, new: true },
      );
      return cast._id;
    });

    const castIds = await Promise.all(castPromises);

    await this.entityManager.show.findByIdAndUpdate(show._id, { cast: castIds });

  }
}

module.exports = ShowIngestor;
