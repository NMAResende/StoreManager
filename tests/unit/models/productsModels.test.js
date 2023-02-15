const sinon = require('sinon');
const { expect } = require('chai');
const { allProducts, idRemove, idProduct } = require('./mocks/products.model.mock');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');

describe('Rota /products', function () {
  describe('Lista todas os produtos', function () {
    it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts]);
    // Act
    const result = await productsModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(allProducts);
  });

    it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    // Act
      const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(allProducts[0]);
    });
  });

  describe('Testa a camada model para a função "insertProducts"', function () {
    it('Faz a inserção de um produto novo', async function () {
      const newProducts = {
        "name": "Escudo do Capitão América"
      }
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const response = await productsModel.insertProducts(newProducts);

      expect(response).to.be.equal(4);
    });
  });

  describe('Testa a camada model para a função "remove"', function () {
    it('Faz a remoção de um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([idRemove]);

      const response = await productsModel.remove(idProduct);

      expect(response).to.be.equal(idRemove);
    });
  });

  afterEach(function () {
      sinon.restore();
    });
});