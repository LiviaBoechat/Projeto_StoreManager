const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const { validateProductId, salesInsertValidation, 
  validateQuantity } = require('../../../src/middlewares/salesReqValidation');
const { reqValidMock, missingIdMock, missingQuantityMock } = require('../mocks/middlewaresMocks');

describe('salesInsertValidation Middleware', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa retorno qd productId é passado', async function () {
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

it('Testa retorno qd productId não é passado', async function () {
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
  it('Testa retorno qd quantity is not a positive number', async function () {
    // Arrange (mock)
    const req = { body: [{ quantity: -5 }] };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await salesInsertValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(
        { message: '"quantity" must be greater than or equal to 1' },
    );
  });

  it('Testa retorno qd a required field is missing', async function () {
    // Arrange (mock)
    const req = { body: [{ productId: '12345' }, { quantity: 10 }] };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await salesInsertValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'is required' });
  });

  it('Testa retorno qd quantity é passado', async function () { // map
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

it('Testa retorno qd quantity não é passado', async function () { // map
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
