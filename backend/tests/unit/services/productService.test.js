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
        sinon.stub(productModel, 'findById').resolves(idMock);
        sinon.stub(productModel, 'update').resolves(updateReturnMock);
        // Act
        const response = await productService.update(idMock, nameMock);
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: updateReturnMock });
    });

    it('Teste se a rota delete com /products/:id funciona', async function () {
        // Arrange (mock)
        const idMock = 10;
        sinon.stub(productModel, 'findById').resolves(idMock);
        sinon.stub(productModel, 'deleteProduct').resolves(true); // sempre retornará true nesse caso específico
        // Act
        const response = await productService.deleteProduct({ type: null, message: true });
        // Assert
        expect(response).to.be.deep.equal({ type: null, message: true });
    });
    
    // it('retorna erro quando um productId inexistente é fornecido', async function () {
    //     // Arrange
    //     const req = [
    //       { productId: 1 },
    //       { productId: 2 },
    //       { productId: 3 },
    //     ];
    //     const maxId = 5;
    //     sinon.stub(productModel, 'findMaxId').resolves(maxId);
    //     // Act
    //     const result = await salesProdValid.saleProductsValidation(req);
    //     // Assert
    //     expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
    //   });
    
    //   it('retorna "Product exists" quando todos os productIds existem', async function () {
    //     // Arrange
    //     const req = [
    //       { productId: 1 },
    //       { productId: 2 },
    //       { productId: 3 },
    //     ];
    //     const maxId = 3;
    //     sinon.stub(productModel, 'findMaxId').resolves(maxId);
    //     // Act
    //     const result = await salesProdValid.saleProductsValidation(req);
    //     // Assert
    //     expect(result).to.deep.equal({ type: null, message: 'Product exists' });
    //   });
});