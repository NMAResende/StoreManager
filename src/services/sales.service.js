const salesModel = require('../models/sales.model');

const getAll = async () => {
  const allSales = await salesModel.getAll();

  return { type: null, message: allSales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (!sale) return { type: 'SALES_NOT_FOUND', message: 'Sales not found' };

  return { type: null, message: sale };
};

const insertSales = async (sales) => {
  const id = await salesModel.insertSales();

  await Promise.all(sales.map(async (sale) => salesModel
    .insertSalesDetails(id, sale.productId, sale.quantity)));

  return {
    id,
    itemsSold: sales,
  };
};

module.exports = {
  getAll,
  findById,
  insertSales,
};