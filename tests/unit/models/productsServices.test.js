const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');

describe('Rota /products', function () {
  describe('Lista todas os produtos', function () {
    before(async function () {
      const execute = [{
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
      ];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {
      const expected = [
        {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
      ];

      const response = await productsModel.findAll();

      expect(response).to.deep.equal(expected);
    });
  });
});