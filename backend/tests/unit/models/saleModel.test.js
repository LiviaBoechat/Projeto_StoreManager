const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const { expect } = chai;

const { listAllSalesMock, oneSaleMock } = require('../mocks/salesMock');

describe('Testes da camada model de Sales', function () {
  beforeEach(function () {
    sinon.restore();
  });
    it('Teste se a rota /Sales retorna lista de produtos', async function () {
      // Arrange (mock)
      sinon.stub(connection, 'execute').resolves([listAllSalesMock]); // mocka EXATEMENTE a função connection.execute e SEU retorno
      // Act
      const result = await salesModel.findAll();
      // Assert
      expect(result).to.deep.equal(listAllSalesMock); 
    });

    it('Teste se a rota com /Sales/:id retorna o produto', async function () {
       // Arrange (mock)
      const id = 1;
      sinon.stub(connection, 'execute').resolves([oneSaleMock]); // mocka EXATEMENTE a função connection.execute e SEU retorno
      // Act
      const response = await salesModel.findById(id);
      // Assert
      expect(response).to.be.deep.equal(oneSaleMock); // SEM [] pq o mock já é um objeto, ñ precisa desestruturar
  });

  it('Testa se a rota retorna erro quando parametro incorreto é passado', async function () {
    // Arrange (mock)
    const id = 999;
    sinon.stub(connection, 'execute').resolves([]); // mocka EXATEMENTE a função connection.execute e SEU retorno
    // Act
    const response = await salesModel.findById(id);
    // Assert
    expect(response).to.have.been.equal(undefined);
  });

  it('Teste se a função insertSale insere uma nova venda', async function () {
    // Arrange (mock)
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    // Act
    const saleId = await salesModel.insertSale();
    // Assert
    expect(saleId).to.deep.equal(1);
  });

  it('Teste se a função addSalesAndProducts insere os produtos corretamente', async function () {
    // Arrange (mock)
    const saleId = 1;
    const productId = 1;
    const quantity = 1;
    sinon.stub(connection, 'execute').resolves([oneSaleMock]); 
    // Act
    const result = await salesModel.addSalesAndProducts(saleId, productId, quantity);
    // Assert
    expect(result).to.deep.equal(oneSaleMock);
  });
});
