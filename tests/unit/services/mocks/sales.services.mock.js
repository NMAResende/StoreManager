const salesList = [
  {
    "saleId": 1,
    "date": "2023-02-15T17:23:31.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2023-02-14T02:31:52.000Z"
  },
  {
    "saleId": 2,
    "date": "2023-02-15T17:23:31.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const newSales = {
  "saleId": 1,
  "date": "2023-02-16T17:23:33.000Z",
  "productId": 1,
  "quantity": 7
};

const idSalesList = [{
  "date": "2023-02-15T17:23:31.000Z",
  "productId": 3,
  "quantity": 15
}];

const salesInsert = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const idRemove =  {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const idSale = 1;

const insert = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
},
  undefined
];

const insertId = 3;

module.exports = {
  salesList,
  newSales,
  idSalesList,
  salesInsert,
  idRemove,
  idSale,
  insert,
  insertId,
}