# TV-Maze Ingestion App

This is a Node.js application that ingests data from the TV Maze API and exposes its own API endpoints for accessing the ingested data. This application provides easy access to information about TV shows, including their schedules, episodes, and other related metadata.

## Features

- Fetch and ingest data from the TV Maze API.
- Expose endpoints for accessing TV show information.
- Lightweight and containerized for easy deployment. (CD is not Included)

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