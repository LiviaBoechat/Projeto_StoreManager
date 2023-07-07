const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const { idValidation, 
    productNameValidation } = require('../../../src/middlewares/insertValidation');
const { reqValidMock, negativeIdMock, notIntergerIdMock } = require('../mocks/middlewaresMocks');

describe('insertValidation Middleware', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa retorno qd id é número inteiro positivo', async function () {
    // Arrange (mock)
    const req = { body: reqValidMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno qd id não é número', async function () {
    // Arrange (mock)
    const req = { body: reqValidMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(res.status.calledWith(400)).to.equal(false);
    expect(res.json.calledWith({ message: '"id" must be a positive number' })).to.equal(false);
  });

  it('Testa retorno qd id é negativo', async function () {
    // Arrange (mock)
    const req = { body: negativeIdMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(res.status.calledWith(400)).to.equal(false);
    expect(res.json.calledWith({ message: '"id" must be a positive number' })).to.equal(false);
  });

  it('Testa retorno qd id não é número inteiro', async function () {
    // Arrange (mock)
    const req = { body: notIntergerIdMock };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(res.status.calledWith(400)).to.equal(false);
    expect(res.json.calledWith({ message: 'Id inválido' })).to.equal(false);
  });
  it('Testa retorno quando o ID é válido', async function () {
    // Arrange (mock)
    const req = { params: { id: '12345' } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno quando o ID é inválido', async function () {
    // Arrange (mock)
    const req = { params: { id: 'abcde' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    // Act
    await idValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Id Inválido',
    });
  });

  it('Testa retorno quando o nome é válido', async function () {
    // Arrange (mock)
    const req = { body: { name: 'Product Name' } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await productNameValidation(req, res, next);
    // Assert
    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno quando o nome é inválido', async function () {
    // Arrange (mock)
    const req = { body: { name: null } };
    const res = {};
    let next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    // Act
    await productNameValidation(req, res, next);
    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(
        { message: 'child "name" fails because ["name" must be a string]' },
    );
  });
});
