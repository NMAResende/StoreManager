const salesService = require('../services/sales.service');

const insertSales = async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  const { type, message } = await salesService.insertSales(saleId, productId, quantity);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insertSales,
};