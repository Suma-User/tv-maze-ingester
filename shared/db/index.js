/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/*
*/
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const schemas = require('../schema');
require('dotenv').config();

const { MONGO_URL } = process.env;


let _entityRepository = {};
let dbConnections = {};

const _bindConnectionToSchema = async (connection) => {
  const dbRepository = {};

  if (!schemas) {
    throw new Error('could not load schemas');
  }

  for (const collection of Object.keys(schemas)) {
    if (schemas[collection] && schemas[collection].schema) {
      dbRepository[collection] = await connection.model(
        collection,
        schemas[collection].schema,
        collection,
      );
    }
  }
  return dbRepository;
};

module.exports = {
  connect: async () => {
    dbConnections = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    _entityRepository = await _bindConnectionToSchema(dbConnections);
    return _entityRepository;
  },
  getEntityRepository: () => {
    return _entityRepository;
  },
};
