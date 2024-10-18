# TV-Maze Ingestion App

## Features Implemented

- **Data Ingestion from TV Maze API**: The application scrapes data from the TV Maze API using a scheduler, ensuring that data is regularly updated without manual intervention.

- **Background Worker for Data Ingestion**: The ingestion process is handled by a background worker thread to ensure that the event queue is not blocked. This allows the main application to remain responsive while data is being ingested.

- **Batch Data Ingestion**: The ingester uses a separate thread to batch data and dump it into the database efficiently. This helps to minimize the impact on the database and improves the overall performance of data ingestion.

- **Retry Logic and Exponential Backoff**: In case of rate limits imposed by the TV Maze API, the ingester implements retry logic with exponential backoff. This ensures that the application can gracefully handle rate limits and continue ingesting data without overwhelming the API.

- **API Endpoints for TV Shows**: The application provides endpoints to fetch TV shows along with their cast information. The endpoint supports pagination (`page` and `limit`), sorting (`sortBy`), and sorting direction (`sortDirection`) to provide flexible access to the data.

- **Dependency Injection Framework**: A lightweight Dependency Injection (DI) framework has been created to manage dependencies within the application, making the code more modular and easier to maintain.

- **Unit Tests with Chai and Mocha**: The application includes test cases written using Chai and Mocha to ensure the correctness of the implementation and maintain code quality.

- **CI Pipeline**: A Continuous Integration (CI) pipeline has been implemented with the following stages:
  - **Linting**: Ensures code quality and style consistency.
  - **Testing**: Runs the unit tests to verify the application logic.
  - **Docker Build**: Builds the Docker image for the application.

- **CI Pipeline Triggered on Branch Changes**: The CI pipeline is configured to run on pull requests or commits to the `master` and `develop` branches, ensuring that all changes are verified before merging.

- **Containerized Deployment**: The application is lightweight and containerized for easy deployment. Docker is used to create a consistent environment for running the application across different systems.

## Prerequisites

- Node.js 20.x
- Docker
- A `.env` file with necessary environment variables.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tv-maze-ingester
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To run the app locally:

```bash
npm start
```

The app will start on port 5002 by default.

### Running with Docker

To run the application in a Docker container:

1. Build the Docker image:
   ```bash
   docker build -t tv-maze-ingester .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 --env-file .env tv-maze-ingester
   ```

## API Endpoints

- `GET /get-shows?page=<page>&limit=<limit>&sortBy=<sortBy>&sortDirection=<sortDirection>`: Fetch paginated list of TV shows along with their cast information, sorted by the specified field and direction.

  Example Response:
  ```json
  {
      "data": [
          {
              "_id": "670d6bb50771cf6c9d5a057b",
              "name": "Gotham",
              "id": 11,
              "cast": [
                  {
                      "_id": "670d6bb50771cf6c9d5a0582",
                      "id": 2183,
                      "name": "David Mazouz",
                      "birthday": "2001-02-19T00:00:00.000Z"
                  },
                  {
                      "_id": "670d6bb50771cf6c9d5a058c",
                      "id": 2188,
                      "name": "Camren Renee Bicondova",
                      "birthday": "1999-05-22T00:00:00.000Z"
                  }
              ]
          },
          {
              "_id": "670d6bb60771cf6c9d5a05b0",
              "name": "Lost Girl",
              "id": 12,
              "cast": [
                  {
                      "_id": "670d6bb60771cf6c9d5a05b8",
                      "id": 2238,
                      "name": "Ksenia Solo",
                      "birthday": "1987-10-08T00:00:00.000Z"
                  }
              ]
          }
      ]
  }
  ```

## Environment Variables

The application uses a `.env` file to manage configuration. Ensure that your `.env` file contains the necessary environment variables before running the application.

Example `.env` file:
```
MONGO_URL=mongodb://127.0.0.1:27017/tv-maze
PORT=5002
TVMAZE_API_URL=https://api.tvmaze.com/
```

## Docker

This project includes a Dockerfile to create a Docker image for the application. The Dockerfile sets up a lightweight Node.js container and copies over the necessary files, including the `.env` file for configuration.

