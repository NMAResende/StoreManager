const salesModel = require('../models/sales.model');

const insertSales = async (sales) => {
  const id = await salesModel.insertSales();

  await Promise.all(sales.map(async (sale) => salesModel
    .insertSalesDetails(id, sales.productId, sale.quantity)));

  return {
    id,
    sales,
  };
};

module.exports = {
  insertSales,
};