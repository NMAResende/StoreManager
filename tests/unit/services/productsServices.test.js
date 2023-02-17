const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts, validName, idProduct, idRemove, mockUpdate,
idProductUp } = require('../services/mocks/products.services.mock');
const { searchProduct } = require('../../../src/services/products.service');

describe('Verificando service de produtos', function () {
  describe('listagem todos os produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'getAll').resolves(allProducts);     
      // act
      const result = await productsService.getAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productsService.findById('a');      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso não exista o produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);    
      // act
      const result = await productsService.findById(1);     
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna um produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);      
      // act
      const result = await productsService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
   });

  describe('cadastro de um produto com valores válidos', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(productsModel, 'insertProducts').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);     
      // act
      const result = await productsService.insertProducts(validName);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

describe('Testa a camada service para a função "updateProducts"', async function () {
    it('Faz a atualização de um produto pelo id', async function () {

      sinon.stub(productsModel, 'findById').resolves([idProductUp]);
      sinon.stub(productsModel, 'updateProducts').resolves(mockUpdate);

      const product = { id: 1, name: "Martelo da Nathália" };
      const responde = await productsService.updateProducts(1, "Martelo da Nathália");
      
      expect(responde.type).to.be.deep.equal(null);
      expect(responde.message).to.be.deep.equal({ id: 1, name: "Martelo da Nathália"});
    });
});
  
  describe('Testa a camada service para a função "remove"', function () {
    it('Faz a remoção de um produto pelo id', async function () {
      const result = { type: null };

      sinon.stub(productsModel, 'findById').resolves([idRemove]);
      sinon.stub(productsModel, 'remove').resolves(undefined);

      const response = await productsService.remove(idProduct);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta fazer a remoção de um produto com um id que não existe', async function () {
      
      const result = { type: 404, message: 'Product not found' };

      sinon.stub(productsModel, 'findById').resolves();
      sinon.stub(productsModel, 'remove').resolves(idRemove);

      const response = await productsService.remove(999);

      expect(response).to.be.deep.equal(result);
    });
  });

  describe('Usando o método GET em /products/search', function () {
    it('Retorna os produtos que contém "Martelo" no nome', async function () {
      const result = [{
        "id": 1,
        "name": "Martelo de Thor"
      }];

      sinon.stub(productsModel, 'getAll').resolves(allProducts);

      const response = await productsService.searchProduct('Martelo');

      expect(response).to.be.deep.equal(result);
    });

    // it('Retorna todos os produtos caso a pesquisa do nome não seja encontrada', async function () {

    //   sinon.stub(productsModel, 'getAll').resolves(allProducts);

    //   const response = await productsService.searchProduct();

    //   expect(response).to.be.deep.equal(allProducts);
    // });
   });

  afterEach(function () {
      sinon.restore();
    });
});