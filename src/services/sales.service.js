const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const getAll = async () => {
  const allSales = await salesModel.getAll();

  return { type: null, message: allSales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  // console.log(sale);

  if (sale.length === 0) return { type: 404, message: 'Sale not found' };

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

const updateSales = async (id, sales) => {
const getProductId = await Promise.all(sales.map(async (sale) => productsModel
  .findById(sale.productId)));
  
  if (getProductId.includes(undefined)) {
    return { type: 404, message: 'Product not found' };
  }

  const existSale = await salesModel.findById(id);

  if (!existSale.length) return { type: 404, message: 'Sale not found' };

  await Promise.all(sales.map(async (sale) => salesModel
    .updateSales({ id, productId: sale.productId, quantity: sale.quantity })));

  return {
    type: null,
    saleId: id,
    message: sales,
  };
};

const remove = async (id) => {
  const deleteId = await salesModel.findById(id);

  if (!deleteId.length) return { type: 404, message: 'Sale not found' };

  await salesModel.remove(id);

  return { type: null };
};

module.exports = {
  getAll,
  findById,
  insertSales,
  updateSales,
  remove,
};