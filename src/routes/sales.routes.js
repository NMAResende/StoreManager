const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateQuantity } = require('../middlewares/validadeQuantity');
const { validateProductId } = require('../middlewares/validateProductId');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.findById);

salesRouter.post('/',
  validateProductId,
  validateQuantity,
  salesController.insertSales);

module.exports = salesRouter;