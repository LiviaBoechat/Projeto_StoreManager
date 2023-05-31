const chai = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');

const { expect } = chai;

const { listAllProductsMock, 
    oneProductMock, 
    insertionDbResponseMock, updateReturnMock } = require('../mocks/productsMock');

describe('Testes da camada service de Products', function () {
    beforeEach(function () {
        sinon.restore();
      });
    it('testando a resposta da rotas /products', async function () {
        // Arrange (mock)
        sinon.stub(productModel, 'findAll').resolves(listAllProductsMock);
        // Act
        const response = await productService.findAll();
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: listAllProductsMock }); 
    });
    it('Teste se a rota com /products/:id retorna o produto', async function () {
        // Arrange (mock)
        sinon.stub(productModel, 'findById').resolves(oneProductMock);
        // Act
        const response = await productService.findById(1);
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: oneProductMock });
    });
    it('Testa msg de erro quando parametro inexistente no db é passado', async function () {
        // Arrange (mock)
        const id = 999;
        sinon.stub(productModel, 'findById').resolves(undefined);
        // Act
        const response = await productService.findById(id);
        // Assert
        expect(response).to.be.deep.equal({ type: 404, message: 'Product not found' });
    });
    it('Testa se a rota post /products responde corretamente', async function () {
        // Arrange (mock)
        const productNameMock = 'Trena';
        sinon.stub(productModel, 'insert').resolves(insertionDbResponseMock);
        // Act
        const response = await productService.insert(productNameMock);
         // Assert
        expect(response).to.be.deep.equal({ type: null, message: insertionDbResponseMock });
    });

    it('Testa se o update é realizado na rota put /products/:id ', async function () {
        // Arrange (mock)
        const idMock = 1;
        const nameMock = 'Capacete';
        sinon.stub(productModel, 'update').resolves(updateReturnMock);
        // Act
        const response = await productService.update(idMock, nameMock);
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: updateReturnMock });
    });
});