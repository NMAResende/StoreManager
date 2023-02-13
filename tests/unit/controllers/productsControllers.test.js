const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
// console.log(productsServices);
const { productsController }= require('../../../src/controllers');

const allProducts = require('./mocks/products.controller.mock');

describe('Teste de unidade do Controller', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAll')
        .resolves({ type: null, message: allProducts });

      // act
      await productsController.getAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Buscando uma produto pelo id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: allProducts });

      // Act
      await productsController.findById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
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
        .stub(productsService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await productsController.getPassenger(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    });
  });
});