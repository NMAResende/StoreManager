const schema = require('./validations/validationsInputValues');
const productsModel = require('../models/products.model');

const getAll = async () => {
  const allProducts = await productsModel.getAll();

  return { type: null, message: allProducts };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insertProducts = async (name) => {
  const id = await productsModel.insertProducts({ name });
  return { type: null, message: { id, name } };
};

const updateProducts = async (id, name) => {
  const existProduct = await productsModel.findById(id);

  if (!existProduct) return { type: 404, message: 'Product not found' };

  await productsModel.updateProducts({ id, name });
  return { type: null, message: { id, name } };
};

const remove = async (id) => {
  const hasProduct = await productsModel.findById(id);
  if (!hasProduct) return { type: 404, message: 'Product not found' };

  await productsModel.remove(id);

  return { type: null };
};

const searchProduct = async (query) => {
  const getAllProduct = await productsModel.getAll();

  const filterProduct = getAllProduct
    .filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
  
  return filterProduct;
};

module.exports = {
  getAll,
  findById,
  insertProducts,
  updateProducts,
  remove,
  searchProduct,
};