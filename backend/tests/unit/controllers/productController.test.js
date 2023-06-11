const sinonChai = require('sinon-chai');
const chai = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');

const { listAllProductsMock, 
    oneProductMock, 
    insertionDbResponseMock, 
    updateReturnMock } = require('../mocks/productsMock');

chai.use(sinonChai);

const { expect } = chai;

describe('testando a camada controller da rota /products', function () {
    beforeEach(function () {
        sinon.restore();
      });
      it('Testa se rota /products  funciona', async function () {
        // Arrange (mock)
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findAll').resolves({ type: 200, message: listAllProductsMock });
        // Act
        await productController.findAll(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(listAllProductsMock);
    });

    it('Testa se rota /products/:id funciona ', async function () {
        // Arrange (mock)
        const req = { params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findById').resolves({ type: null, message: oneProductMock });
        // Act
        await productController.findById(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(oneProductMock);
    });

    it('Testa se rota get /products/search funciona ', async function () {
        // Arrange (mock)
        const req = { query: 'Martelo' };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findByQuery')
          .resolves({ type: null, message: oneProductMock });
        // Act
        await productController.findByQuery(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(oneProductMock);
    });

    it('Testa se rota get /products/search retorna tudo se query é undefined', async function () {
        // Arrange (mock)
        const req = { query: '' };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findByQuery')
          .resolves({ type: null, message: listAllProductsMock });
        // Act
        await productController.findByQuery(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(listAllProductsMock);
    });

    it('Testa se rota get /products/search retorna [] se query ñ existir no db', async function () {
        // Arrange (mock)
        const req = { query: '' };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findByQuery')
          .resolves({ type: 200, message: [] });
        // Act
        await productController.findByQuery(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([]);
    });
    it('Testa se a rota post /products funciona', async function () {
        // Arrange (mock)
        const req = { body: { name: 'Trena' } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'insert')
        .resolves({ type: null, message: insertionDbResponseMock });
        // Act
        await productController.insert(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(insertionDbResponseMock);
    });

    it('Testa se o update é realizado na rota put /products/:id ', async function () {
        // Arrange (mock)
        const req = { body: { name: 'Capacete' }, params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'update').resolves({ type: null, message: updateReturnMock });
         // Act
        await productController.update(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(updateReturnMock);
    });
    it('Testa se rota delete /products/:id funciona ', async function () {
        // Arrange (mock)
        const req = { params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'deleteProduct')
          .resolves({ type: null, message: true });
        // Act
        await productController.deleteProduct(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(204);
        expect(res.json).to.have.been.calledWith('');
    });
});