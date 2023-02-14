const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const insertSales = async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  const { type, message } = await salesService.insertSales(saleId, productId, quantity);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getAll,
  findById,
  insertSales,
};