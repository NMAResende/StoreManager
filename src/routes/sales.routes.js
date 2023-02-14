const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateQuantity } = require('../middlewares/validadeQuantity');
const { validateProductId } = require('../middlewares/validateProductId');

const salesRouter = express.Router();

salesRouter.post('/',
  validateProductId,
  validateQuantity,
  salesController.insertSales);

module.exports = salesRouter;