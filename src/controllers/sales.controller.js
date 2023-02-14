const salesService = require('../services/sales.service');

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  console.log(message);

  if (type) return res.status((type)).json({ message });

  res.status(200).json(message);
};

const insertSales = async (req, res) => {
  const sales = req.body;
  const { type, id, message } = await salesService.insertSales(sales);

  if (type) return res.status(type).json({ message });

  res.status(201).json({ id, itemsSold: message });
};

module.exports = {
  getAll,
  findById,
  insertSales,
};