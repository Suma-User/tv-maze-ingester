const Joi = require('joi');

module.exports = {
  get: Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).max(20).required(),
    sortBy: Joi.any().valid('birthday'),
    sortDirection: Joi.any().valid(['1', '-1']),
  }),
};
