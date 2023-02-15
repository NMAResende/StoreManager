const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { salesList, idSalesList, newSales, salesInsert } = require('../services/mocks/sales.services.mock');

describe('Verificando service de vendas', function () {
  describe('listagem todas as vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      // arrange
      sinon.stub(salesModel, 'getAll').resolves(salesList);
      // act
      const result = await salesService.getAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesList);
    });
  });

  describe('busca de uma venda', function () {
    // it('retorna um erro caso receba um ID inválido', async function () {
    //   sinon.stub(salesModel, 'findById').resolves();
    //   // act
    //   const result = await salesService.findById('a');
    //   // assert
    //   expect(result.type).to.equal(422);
    //   expect(result.message).to.equal('"id" must be a number');
    // });

     it('retorna uma venda inválida caso receba um ID não exista', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      // act
      const result = await salesService.findById(50);
      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Sale not found');
    });
   
    it('retorna uma venda caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(idSalesList);     
      // act
      const result = await salesService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(idSalesList);
    });
  });

  // describe('Testa a camada service para a função "insertSales"', async function () {
  //   it('Faz a inserção de uma nova venda', async function () {
  //     const result = { type: null, message: newSales }

  //     sinon.stub(salesModel, 'insertSales').resolves();
  //     sinon.stub(salesModel, 'insertSalesDetails').resolves();

  //     const response = await salesService.insertSales(salesInsert);

  //     expect(response).to.be.deep.equal(result);
  //   });
  // });

  afterEach(function () {
      sinon.restore();
    });
});