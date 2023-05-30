const sinonChai = require('sinon-chai');
const chai = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');

const { insertionDbResponseMock } = require('../mocks/productsMock');

chai.use(sinonChai);

const { expect } = chai;

describe('testando a camada controller da rota /products', function () {
    beforeEach(function () {
        sinon.restore();
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
//     it(
// 'Testa se a rota post /products retorna erro se inserir produto s/ name',
//      async function () {
//         // Arrange (mock)
//         const req = { body: { name: '' } };
//         const res = {};
//         res.status = sinon.stub().returns(res);
//         res.json = sinon.stub().returns();
//         sinon.stub(productService, 'insert').resolves({ 
//           message: 'name is not allowed to be empty', 
//         });
//         // Act
//         await productController.insert(req, res);
//         // Assert
//         expect(res.json).to.have.been.calledWith({ message: '"name" is not allowed to be empty' });
//     },
// );
//     it(
//       'Testa se a rota post /products retorna erro se name < 5 caracteres',
//        async function () {
//         // Arrange (mock)
//         const req = { body: { name: 'aaa' } };
//         const res = {};
//         res.status = sinon.stub().returns(res);
//         res.json = sinon.stub().returns();
//         sinon.stub(productService, 'insert').resolves({ 
//           message: '"name" length must be at least 5 characters long', 
//         });
//         // Act
//         await productController.insert(req, res);
//         // Assert
//         expect(res.json).to.have.been.calledWith({ 
//           message: '"name" length must be at least 5 characters long', 
//         });
//     },
// );
});