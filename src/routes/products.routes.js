const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.findById);
productsRouter.post('/', productsController.insertProducts);

module.exports = productsRouter;