const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT saleID, date, productId, quantity FROM Store_manager.sales as s 
    INNER JOIN StoreManager.sales_products AS p 
    ON s.sale_id = p.sale_id
    ORDER BY s.sale_id ASC, p.product_id ASC`,
  );
  
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT date, productId, quantity FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS p
    ON s.sale_id = p.sale_id
    ORDER BY s.sale_id ASC, p.product_id ASC`,
    [id],
  );

  return result;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return insertId;
};

const insertSalesDetails = async ({ saleId, productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (saleId, productId, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result;
};

module.exports = {
  getAll,
  findById,
  insertSales,
  insertSalesDetails,
};