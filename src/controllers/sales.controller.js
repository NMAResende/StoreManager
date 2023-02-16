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

const updateSales = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.params;
  
  const { type, message } = await salesService.updateSales(id, productId, quantity);

  if (type) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json({ id, itemsSold: message });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.remove(id);

  if (type) return res.status(404).json({ message });

  res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  insertSales,
  updateSales,
  remove,
};