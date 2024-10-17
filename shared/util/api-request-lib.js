const axios = require('axios');

class APIRequestLib {
  constructor(baseURL, maxRetries = 3, initialDelayMs = 1000) {
    this.client = axios.create({ baseURL });
    this.maxRetries = maxRetries;
    this.initialDelayMs = initialDelayMs;
  }

  async get(url, config = {}) {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        const response = await this.client.get(url, config);
        return response.data;
      } catch (error) {
        if (this.shouldRetry(error) && retries < this.maxRetries - 1) {
          retries++;
          await this.delay(this.exponentialBackoff(retries));
          continue;
        }
        throw error;
      }
    }
  }

  shouldRetry(error) {
    return (
      axios.isAxiosError(error) &&
      (!error.response || error.response.status >= 500 || error.response.status === 429)
    );
  }

  exponentialBackoff(retryCount) {
    return this.initialDelayMs * Math.pow(2, retryCount);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = APIRequestLib;
