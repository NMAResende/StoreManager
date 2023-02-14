const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await productsService.getAll();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const insertProducts = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProducts(name);

  console.log(message);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getAll,
  findById,
  insertProducts,
};