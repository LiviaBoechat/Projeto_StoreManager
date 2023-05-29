const chai = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');

const { expect } = chai;

const { listAllSalesMock, oneSaleMock } = require('../mocks/salesMock');

describe('Testes da camada service de sales', function () {
    beforeEach(function () {
        sinon.restore();
      });
    it('testando a resposta da rotas /sales', async function () {
        // Arrange (mock)
        sinon.stub(salesModel, 'findAll').resolves(listAllSalesMock);
        // Act
        const response = await salesService.findAll();
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: listAllSalesMock }); 
    });
    it('Teste se a rota com /sales/:id retorna o produto', async function () {
        // Arrange (mock)
        sinon.stub(salesModel, 'findById').resolves(oneSaleMock);
        // Act
        const response = await salesService.findById(1);
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: oneSaleMock });
    });
    it('Testa msg de erro quando parametro inexistente no db é passado', async function () {
        // Arrange (mock)
        const id = 999;
        sinon.stub(salesModel, 'findById').resolves([]);
        // Act
        const response = await salesService.findById(id);
        // Assert
        expect(response).to.be.deep.equal({ type: 404, message: 'Sale not found' });
    });
});