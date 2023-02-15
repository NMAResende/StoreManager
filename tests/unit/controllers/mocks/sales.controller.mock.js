const salesList = [
  {
    "saleId": 1,
    "date": "2023-02-15T17:23:31.000Z",
    "productId": 1,
    "quantity": 5
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

const salesInsert = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const resultController = {
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
};

module.exports = {
  salesList,
  newSales,
  idSalesList,
  salesInsert,
  resultController,
}