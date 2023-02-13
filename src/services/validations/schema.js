const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addSchemaProduct = Joi.object({
  name: Joi.string().min(5).max(40).required(),
});

module.exports = {
  idSchema,
  addSchemaProduct,
};