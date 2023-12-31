const sinonChai = require('sinon-chai');
const chai = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

const { listAllSalesMock, oneSaleMock,
    postSaleReturnMock, salesMock } = require('../mocks/salesMock');

chai.use(sinonChai);

const { expect } = chai;

describe('testando a camada controller da rota /sales', function () {
    beforeEach(function () {
        sinon.restore();
      });
      it('Testa se rota /sales  funciona', async function () {
        // Arrange (mock)
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'findAll').resolves({ type: null, message: listAllSalesMock });
        // Act
        await salesController.findAll(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(listAllSalesMock);
    });

    it('testando a resposta da rota /sales/:id', async function () {
        // Arrange (mock)
        const req = { params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'findById').resolves({ type: null, message: oneSaleMock });
        // Act
        await salesController.findById(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(oneSaleMock);
    });
    it('Testa se a rota post /sales funciona', async function () {
        // Arrange (mock)
        const req = { body: salesMock };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'insert')
        .resolves({ type: null, message: postSaleReturnMock });
        // Act
        await salesController.insert(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(postSaleReturnMock);
    });

    it('Testa se rota delete /sales/:id funciona ', async function () {
        // Arrange (mock)
        const req = { params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'deleteSale')
          .resolves({ type: null, message: true });
        // Act
        await salesController.deleteSale(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(204);
        expect(res.json).to.have.been.calledWith('');
    });

    it('Testa se rota put /sales/:saleId/products/:productId funciona', async function () {
        // Arrange (mock)
        const req = {
            params: { saleId: 1, productId: 1 },
            body: { quantity: 10 },
        };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'update').resolves(
            { type: null, message: 'Sale updated successfully' },
        );
        // Act
        await salesController.update(req, res);
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith('Sale updated successfully');
    });
});