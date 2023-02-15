const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController }= require('../../../src/controllers');
const { salesList, newSales,
  salesInsert,
  resultController } = require('./mocks/products.controller.mock');

describe('Teste de unidade do Controller', function () {
  describe('Listando todas as vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      // arrange
      const res = {};
      const req = {}; 

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'getAll')
        .resolves({ type: null, message: salesList });
      // act
      await salesController.getAll(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });
  });

  describe('Buscando uma venda pelo id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: salesList });
      // Act
      await salesController.findById(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });
    
    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(salesService, 'findById')
        .resolves({ type: 404, message: 'Sale not found' });
      // Act
      await salesController.findById(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
    });
  });

  describe('Testa a camada controller para a função "insertSales"', function () {
    it('Faz a inserção de uma nova venda', async function () {
      const req = { body: salesInsert };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSales').resolves(salesInsert);

      await salesController.insertSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resultController);
    });

    it('Tenta fazer a inserção de uma nova pessoa sem sucesso', async function () {
      const req = { body: newSales };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSales').resolves({ type: 404, message: 'Sale not found' });

      await salesController.insertSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
      sinon.restore();
    });
  });
