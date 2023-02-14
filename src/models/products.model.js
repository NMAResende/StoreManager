const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)',
    [id],
  );

  return result;
};

const insertProducts = async ({ name }) => {
 const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
 );
  
  return result.insertId;
};

const updateProducts = async (id, { name }) => {
  const [result] = connection.execute(
    `UPDATE StoreManager.products
  SET name = (?) WHERE id = (?)`,
  [name, id],
  );

return result;
};

const remove = async (id) => {
  const [result] = await connection.execute(
    'DELETE * FROM StoreManager.products WHERE id = (?)',
    [id],
  );

  return result;
};

module.exports = {
  getAll,
  findById,
  insertProducts,
  updateProducts,
  remove,
};