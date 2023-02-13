const sinon = require('sinon');
const { expect } = require('chai');
const allProducts  = require('./mocks/products.model.mock');
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

    afterEach(function () {
    sinon.restore();
  });
  });
});