const camelize = require('camelize');
const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT id AS sale_id, date, product_id, quantity FROM StoreManager.sales as s 
    INNER JOIN StoreManager.sales_products AS p 
    ON s.id = p.sale_id
    ORDER BY s.id ASC, p.product_id ASC`,
  );
  
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS p
    ON s.id = p.sale_id WHERE s.id = ?
    ORDER BY s.id ASC, p.product_id ASC`,
    [id],
  );
console.log(result);
  return camelize(result);
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return insertId;
};

const insertSalesDetails = async ({ saleId, productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return camelize(result);
};

const updateSales = async ({ id, productId, quantity }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ? 
    WHERE sale_id = ? AND product_id = ?`,
    [id, productId, quantity],
  );
console.log(result);
  return camelize(result);
};

const remove = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  
  return result;
};
module.exports = {
  getAll,
  findById,
  insertSales,
  insertSalesDetails,
  updateSales,
  remove,
};