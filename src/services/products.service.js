const schema = require('./validations/validationsInputValues');
const productsModel = require('../models/products.model');

const getAll = async () => {
  const allProducts = await productsModel.getAll();

  return { type: null, message: allProducts };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  console.log(error);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insertProducts = async (name) => {
  const id = await productsModel.insertProducts({ name });
  return { type: null, message: { id, name } };
};

module.exports = {
  getAll,
  findById,
  insertProducts,
};