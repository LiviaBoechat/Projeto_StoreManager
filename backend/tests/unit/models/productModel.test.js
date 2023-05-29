const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { expect } = chai;

const { listAllProductsMock, oneProductMock } = require('../mocks/productsMock');

describe('Testes da camada model de Products', function () {
  beforeEach(function () {
    sinon.restore();
  });
    it('Teste se a rota /products retorna lista de produtos', async function () {
      // Arrange (mock)
      sinon.stub(connection, 'execute').resolves([listAllProductsMock]); // mocka EXATEMENTE a função connection.execute e SEU retorno
      // Act
      const result = await productModel.findAll();
      // Assert
      expect(result).to.deep.equal(listAllProductsMock);
    });

    it('Teste se a rota com /products/:id retorna o produto', async function () {
       // Arrange (mock)
      const id = 1;
      sinon.stub(connection, 'execute').resolves([[oneProductMock]]); // mocka EXATEMENTE a função connection.execute e SEU retorno
      // Act
      const response = await productModel.findById(id);
      // Assert
      expect(response).to.be.deep.equal(oneProductMock); // SEM [] pq o mock já é um objeto, ñ precisa desestruturar
  });

  it('Testa se a rota retorna erro quando parametro incorreto é passado', async function () {
    // Arrange (mock)
    const id = 999;
    sinon.stub(connection, 'execute').resolves([[]]); // mocka EXATEMENTE a função connection.execute e SEU retorno
    // Act
    const response = await productModel.findById(id);
    // Assert
    expect(response).to.have.been.equal(undefined);
});
});