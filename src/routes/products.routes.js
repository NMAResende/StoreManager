const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validateName');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.findById);
productsRouter.post('/', validateName, productsController.insertProducts);
productsRouter.put('/:id', productsController.updateProducts);
productsRouter.delete('/:id', productsController.remove);

module.exports = productsRouter;