const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const { updateProductValidation } = require('../../../src/middlewares/updateProductValidation');

describe('updateValidation Middleware', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa retorno quando a quantidade é passada', async function () {
    // Arrange (mock)
    const req = { body: { quantity: 10 } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await updateProductValidation(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno quando a quantidade não é passada', async function () {
    // Arrange (mock)
    const req = { body: { } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await updateProductValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Testa retorno quando a quantidade é menor ou igual a 0', async function () {
    // Arrange (mock)
    const req = { body: { quantity: -1 } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await updateProductValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(
        { message: '"quantity" must be greater than or equal to 1' },
    );
  });
});
