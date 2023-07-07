// const chai = require('chai');
// const sinon = require('sinon');
// const { validateProductId, 
//     validateQuantity } = require('../../../src/middlewares/salesReqValidation');
//     const { idValidation } = require('../../../src/middlewares/insertValidation');

// const { reqValidMock, 
//   missingIdMock, missingQuantityMock,
//   negativeIdMock,
//   notIntergerIdMock, 
//    } = require('../mocks/middlewaresMocks');

// const { expect } = chai;

// describe('Testes dos middlewares', function () {
//   beforeEach(function () {
//     sinon.restore();
//   });
  //   it('Testa retorno qd productId é passado', async function () {
  //     // Arrange (mock)
  //     const req = { body: reqValidMock };
  //     const res = {};
  //     let next = {};
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     next = sinon.stub().returns();
  //     // Act
  //     await validateProductId(req, res, next);
  //     // Assert
  //     expect(next).to.have.been.calledWith();
  // });

  // it('Testa retorno qd productId não é passado', async function () {
  //     // Arrange (mock)
  //     const req = { body: missingIdMock };
  //     const res = {};
  //     let next = {};
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     next = sinon.stub().returns();
  //     // Act
  //     await validateProductId(req, res, next);
  //     // Assert
  //     expect(res.status).to.have.been.calledWith(400);
  //     expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  // });

  // it('Testa retorno qd id é número inteiro positivo', async function () {
  //   // Arrange (mock)
  //   const req = { body: reqValidMock };
  //   const res = {};
  //   let next = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   next = sinon.stub().returns();
  //   // Act
  //   await idValidation(req, res, next);
  //   // Assert
  //   expect(next).to.have.been.calledWith();
  // });

  // it('Testa retorno qd id não é número', async function () {
  //   // Arrange (mock)
  //   const req = { body: reqValidMock };
  //   const res = {};
  //   let next = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   next = sinon.stub().returns();
  //   // Act
  //   await idValidation(req, res, next);
  //   // Assert
  //   expect(res.status.calledWith(400)).to.equal(false);
  //   expect(res.json.calledWith({ message: '"id" must be a positive number' })).to.equal(false);
  // });

  // it('Testa retorno qd id é negativo', async function () {
  //   // Arrange (mock)
  //   const req = { body: negativeIdMock };
  //   const res = {};
  //   let next = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   next = sinon.stub().returns();
  //   // Act
  //   await idValidation(req, res, next);
  //   // Assert
  //   expect(res.status.calledWith(400)).to.equal(false);
  //   expect(res.json.calledWith({ message: '"id" must be a positive number' })).to.equal(false);
  // });

  // it('Testa retorno qd id não é número inteiro', async function () {
  //   // Arrange (mock)
  //   const req = { body: notIntergerIdMock };
  //   const res = {};
  //   let next = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   next = sinon.stub().returns();
  //   // Act
  //   await idValidation(req, res, next);
  //   // Assert
  //   expect(res.status.calledWith(400)).to.equal(false);
  //   expect(res.json.calledWith({ message: '"id" must be an integer' })).to.equal(false);
  // });
  // it('Testa retorno qd quantity é passado', async function () { // map
  //     // Arrange (mock)
  //     const req = { body: reqValidMock };
  //     const res = {};
  //     let next = {};
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     next = sinon.stub().returns();
  //     // Act
  //     await validateQuantity(req, res, next);
  //     // Assert
  //     expect(next).to.have.been.calledWith();
  // }); 

  // it('Testa retorno qd quantity não é passado', async function () { // map
  //     const req = { body: missingQuantityMock };
  //     const res = {};
  //     let next = {};
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     next = sinon.stub().returns();
  //     // Act
  //     await validateQuantity(req, res, next);
  //     // Assert
  //     expect(res.status).to.have.been.calledWith(400);
  //     expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  // }); 
// });
