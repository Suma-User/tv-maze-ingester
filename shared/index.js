/* eslint-disable no-console */
/* eslint-disable global-require */
require('dotenv').config();
const cron = require('node-cron');

const { app, path, injector, folderLoader, fileLoader, findComponents } = require('./packages');



const server = async () => {
  require('./middleware/middleware')(app);
  await require('./loader')([path.resolve(__dirname, '../')], app);
  await require('./db').connect();
  require('./route/default.route')(app);
  injector.register('app', app);

  const ShowIngestor = require('../src/service/showIngester');
  const ingestor = new ShowIngestor(
    process.env.TVMAZE_API_URL,
    require('./db').getEntityRepository(),
    {}, // mock cache object
  );
  injector.register('showIngestor', ingestor);

  setImmediate(() => {
    ingestor.startIngestion();
  });
  
  // Schedule the ingestion to run every day at 12 AM
  cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled ingestion at 12 AM');
    ingestor.startIngestion();
  });

  app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}...`));
};

module.exports = {
  server,
  getEntityRepository: require('./db').getEntityRepository,
  enums: require('./enums'),
  folderLoader,
  fileLoader,
  findComponents,
  injector,
  ...require('./packages'),
};
