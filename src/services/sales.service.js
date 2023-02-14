const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const getAll = async () => {
  const allSales = await salesModel.getAll();

  return { type: null, message: allSales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (!sale.length) return { type: 'SALES_NOT_FOUND', message: 'Sales not found' };

  return { type: null, message: sale };
};

const insertSales = async (sales) => {
  const getProductId = await Promise.all(sales.map(async (sale) => productsModel
    .findById(sale.productId)));
  
  if (getProductId.includes(undefined)) {
    return { type: 404, message: 'Product not found' };
  }

  const saleId = await salesModel.insertSales();

  await Promise.all(sales.map(async (sale) => salesModel
    .insertSalesDetails({ saleId, productId: sale.productId, quantity: sale.quantity })));

  return { type: null, 
    id: saleId,
    message: sales,
  };
};

module.exports = {
  getAll,
  findById,
  insertSales,
};