const { parentPort, workerData } = require('worker_threads');
const APIRequestLib = require('shared/util/api-request-lib');

const apiClient = new APIRequestLib(process.env.TVMAZE_API_URL);

async function fetchShowData(showId) {
  try {
    const showData = await apiClient.get(`/shows/${showId}?embed=cast`);
    parentPort.postMessage({ type: 'show_data', data: showData });
  } catch (error) {
    console.error(`Error fetching data for show ${showId}:`, error.message);
  }
}

async function run() {
  const { startId, endId } = workerData;
  for (let id = startId; id <= endId; id++) {
    await fetchShowData(id);
  }
  parentPort.postMessage({ type: 'complete' });
}

run().catch((error) => {
  console.error('Worker error:', error);
  parentPort.postMessage({ type: 'error', error: error.message });
});
