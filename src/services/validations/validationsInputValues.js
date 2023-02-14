const { idSchema, 
  addSchemaProduct,
  addSchemaSales,
  } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addSchemaProduct
    .validate({ name });
  if (error) return { type: 422, message: '"name" length must be at least 5 characters long' };
  
  return { type: null, message: '' };
};

const validateSalesId = (id) => {
  const { error } = addSchemaSales.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSalesId,
};