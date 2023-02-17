const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController }= require('../../../src/controllers');
const { allProducts, product, newProduct } = require('./mocks/products.controller.mock');

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
      await productsController.findById(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: product,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    
      sinon
        .stub(productsService, 'insertProducts')
        .resolves({ type: null, message: newProduct });

      // Act
      await productsController.insertProducts(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: 'Zé',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
     
      sinon
        .stub(productsService, 'insertProducts')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      // Act
      await productsController.insertProducts(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith('INVALID_VALUE');      
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Testa a camada controller para a função "remove"', function () {
    it('Faz a remoção de um produto através do id', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(productsService, 'remove').resolves({ type: null });

      await productsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Faz a remoção de um produto através do id que não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'remove').resolves({ type: 404, message: 'Product not found' });

      await productsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Usando o método GET em /products/search', function () {
    it('Retorna os produtos que contém "Martelo" no nome', async function () {
       const result = [{
        "id": 1,
        "name": "Martelo de Thor"
      }];
      const res = {};
      const req = { query: { "q": "Martelo" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'searchProduct').resolves(result);

      await productsController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(result);
    });
   });

  afterEach(function () {
      sinon.restore();
    });
  });
