const sinon = require('sinon');
const { expect } = require('chai');
const { salesList, newSales, idSalesList, idRemove, idSale } = require('./mocks/products.model.mock');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');

describe('Rota /sales', function () {
  describe('Lista todas as vendas', function () {
    it('Listando todas as vendas', async function () {
    // Arrange
      sinon.stub(connection, 'execute').resolves([salesList]);
    // Act
      const result = await salesModel.getAll();
    // Assert
      expect(result).to.be.deep.equal(salesList);
  });

    it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
      sinon.stub(connection, 'execute').resolves([idSalesList]);
    // Act
      const result = await salesModel.findById(1);
    // Assert
      expect(result).to.be.deep.equal(idSalesList);
    });
  });

  describe('Testa a camada model para a função "insertSales"', function () {
    it('Faz a inserção de uma nova venda', async function () {
      
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const response = await salesModel.insertSales(newSales);

      expect(response).to.be.equal(4);
    });
  });

  describe('Testa a camada model para a função "remove"', function () {
    it('Faz a remoção de uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([idRemove]);

      const response = await salesModel.remove(idSale);

      expect(response).to.be.equal(idRemove);
    });
  });

  afterEach(function () {
      sinon.restore();
    });
});