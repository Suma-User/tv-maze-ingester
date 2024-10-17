const mongoose = require('mongoose');
const BaseSchema = require('./common/baseSchema');

const PersonSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    url: { type: String },
    name: { type: String, required: true },
    country: {
      name: { type: String },
      code: { type: String },
      timezone: { type: String },
    },
    birthday: { type: Date },
    deathday: { type: Date },
    gender: { type: String },
    image: {
      medium: { type: String },
      original: { type: String },
    },
    updated: { type: Number },
  },
  { _id: false },
);

const CharacterSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    url: { type: String },
    name: { type: String, required: true },
    image: {
      medium: { type: String },
      original: { type: String },
    },
  },
  { _id: false },
);

const CastSchema = BaseSchema({
  person: PersonSchema,
  character: CharacterSchema,
  self: { type: Boolean },
  voice: { type: Boolean },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
});

module.exports = mongoose.model('cast', CastSchema, 'cast');
