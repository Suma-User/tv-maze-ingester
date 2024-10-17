/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const LEAN = 'lean';

const setLeanOption = function (mongooseObject) {
  const leanOption = Object.keys(mongooseObject._mongooseOptions).some((item) => {
    return item === LEAN && !mongooseObject._mongooseOptions.lean;
  });
  mongooseObject._mongooseOptions.lean = !leanOption;
};
const transformResult = (docs) => {
  if (docs) {
    const _docs = [].concat(docs);
    _docs.forEach((doc) => {
      doc.id = doc._id && doc._id.toHexString();
    });
  }
};

// eslint-disable-next-line prefer-arrow-callback
mongoose.plugin(function (schema) {
  // eslint-disable-next-line prefer-arrow-callback
  schema.pre('updateMany', function (next) {
    this.update({}, { $set: { modifiedDate: Date.now() } });
    return next();
  });
});
module.exports = (props, options) => {
  const attributes = !props ? {} : { ...props };
  if (!options || !options.default) {
    attributes.createdBy = { type: mongoose.Schema.Types.ObjectId };
    attributes.createdDate = { type: Date, default: Date.now };
    attributes.modifiedBy = { type: mongoose.Schema.Types.ObjectId };
    attributes.modifiedDate = { type: Date, default: Date.now };
  }

  const baseSchema = new mongoose.Schema(attributes, {
    _id: true,
    autoIndex: false,
  });
  baseSchema.set('toJSON', { virtuals: true });
  baseSchema.set('toObject', { virtuals: true });
  baseSchema.pre('find', function (next) {
    setLeanOption(this);
    next();
  });
  baseSchema.pre('findOne', function (next) {
    setLeanOption(this);
    next();
  });
  baseSchema.post('findOne', transformResult);
  baseSchema.post('find', transformResult);
  baseSchema.pre('save', function (next) {
    const self = this;
    const now = new Date();
    self.validate((error) => {
      if (error) {
        return next(error);
      }
      if (self.isNew) {
        self._doc._id = self._doc._id || new mongoose.Types.ObjectId();
        self._doc.createdDate = self._doc.createdDate || now;
        self._doc.modifiedDate = self._doc.modifiedDate || now;
        self._doc.modifiedBy = self._doc.modifiedBy || self._doc.createdBy;
      } else if (self.modifiedDate) {
        self.modifiedDate = now;
      }
      return next();
    });
  });
  baseSchema.pre('updateOne', function (next) {
    this.options.runValidators = true;
    this.update({}, { $set: { modifiedDate: Date.now() } });
    next();
  });
  baseSchema.pre('update', function (next) {
    this.options.runValidators = true;
    this.update(
      {},
      {
        $set: {
          modifiedDate: Date.now(),
        },
        $setOnInsert: {
          createdDate: Date.now(),
        },
      },
    );
    next();
  });
  baseSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true;
    this.update({}, { $set: { modifiedDate: Date.now() } });
    next();
  });
  return baseSchema;
};
