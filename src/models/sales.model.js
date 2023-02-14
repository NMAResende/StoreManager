const connection = require('./db/connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (date) VALUES (NOW())',
  );

  return insertId;
};

const insertSalesDetails = async ({ saleId, productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (saleId, productId, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result;
};

module.exports = {
  insertSales,
  insertSalesDetails,
};