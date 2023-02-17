const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const invalidValue = 'a';
const validName = 'Martelo de Thor';
const emptyName = '';

const idRemove =  {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const idProduct = 1;

module.exports = {
  allProducts,
  invalidValue,
  validName,
  emptyName,
  idRemove,
  idProduct,
};