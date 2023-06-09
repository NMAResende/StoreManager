const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { salesList, idSalesList,
  newSales, salesInsert,
  idRemove, idSale, insert, insertId } = require('../services/mocks/sales.services.mock');
  const { allProducts } = require('../services/mocks/products.services.mock');

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
    it('retorna um erro caso receba um ID inválido', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      // act
      const result = await salesService.findById('a');
      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Sale not found');
    });

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

  //     sinon.stub(productsModel, 'findById').resolves(allProducts); 
  //     sinon.stub(salesModel, 'insertSales').resolves([{ insertId }]);
  //     sinon.stub(salesModel, 'insertSalesDetails').resolves(insert);

  //     const response = await salesService.insertSales(salesInsert.itemsSold);

  //     expect(response).to.be.deep.equal(salesInsert);
  //   });
  // });

  describe('Testa a camada service para a função "remove"', function () {
    it('Faz a remoção de uma venda pelo id', async function () {
      const result = { type: null };

      sinon.stub(salesModel, 'findById').resolves([idRemove]);
      sinon.stub(salesModel, 'remove').resolves(undefined);

      const response = await salesService.remove(idSale);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta fazer a remoção de uma venda com um id que não existe', async function () {
      
      const result = { type: 404, message: 'Sale not found' };

      sinon.stub(salesModel, 'findById').resolves(idRemove);
      sinon.stub(salesModel, 'remove').resolves(undefined);

      const response = await salesService.remove(999);

      expect(response).to.be.deep.equal(result);
    });
  });

  afterEach(function () {
      sinon.restore();
    });
});