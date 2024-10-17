const mongoose = require('mongoose');
const BaseSchema = require('./common/baseSchema');

const CountrySchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String },
    timezone: { type: String },
  },
  { _id: false },
);

const NetworkSchema = new mongoose.Schema(
  {
    tvMazeId: { type: Number },
    name: { type: String },
    country: CountrySchema,
    officialSite: { type: String },
  },
  { _id: false },
);

const ShowSchema = BaseSchema({
  id: { type: Number, required: true, unique: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String },
  language: { type: String },
  genres: [String],
  status: { type: String },
  runtime: { type: Number },
  averageRuntime: { type: Number },
  premiered: { type: Date },
  ended: { type: Date },
  officialSite: { type: String },
  schedule: {
    time: { type: String },
    days: [String],
  },
  rating: {
    average: { type: Number },
  },
  weight: { type: Number },
  network: NetworkSchema,
  webChannel: {
    tvMazeId: { type: Number },
    name: { type: String },
    country: CountrySchema,
    officialSite: { type: String },
  },
  externals: {
    tvrage: { type: Number },
    thetvdb: { type: Number },
    imdb: { type: String },
  },
  image: {
    medium: { type: String },
    original: { type: String },
  },
  summary: { type: String },
  updated: { type: Number },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cast' }],
});

module.exports = mongoose.model('show', ShowSchema, 'show');
