const chai = require('chai');
const sinon = require('sinon');
const { validateProductId, 
    validateQuantity } = require('../../../src/middlewares/salesReqValidation');

const { reqValidMock, missingIdMock, missingQuantityMock } = require('../mocks/middlewaresMocks');

const { expect } = chai;

describe('Testes dos middlewares', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testa retorno com productId é passado', async function () {
    // Arrange (mock)
    const req = { body: reqValidMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await validateProductId(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
 });

 it('Testa retorno com productId não é passado', async function () {
    // Arrange (mock)
    const req = { body: missingIdMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await validateProductId(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
 });

it('Testa retorno com quantity é passado', async function () {
    // Arrange (mock)
    const req = { body: reqValidMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await validateQuantity(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
}); 

it('Testa retorno com quantity não é passado', async function () {
    // Arrange (mock)
    const req = { body: missingQuantityMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await validateQuantity(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
}); 
});
