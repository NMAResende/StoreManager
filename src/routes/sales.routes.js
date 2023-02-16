const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateQuantity, validateQuantityExist } = require('../middlewares/validadeQuantity');
const { validateProductId } = require('../middlewares/validateProductId');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.findById);

salesRouter.post('/',
  validateProductId,
  validateQuantityExist,
  validateQuantity,
  salesController.insertSales);

salesRouter.delete('/:id', salesController.remove);

module.exports = salesRouter;