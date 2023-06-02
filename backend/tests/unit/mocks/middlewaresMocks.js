const reqValidMock = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ];

const missingIdMock = [
    {
      quantity: 1,
    },
  ];

  const missingQuantityMock = [
    {
      productId: 1,
    },
  ];

  const invalidIdMock = [
    {
      productId: 'invalid',
      quantity: 1,
    },
  ];

  const negativeIdMock = [
    {
      productId: -1,
      quantity: 1,
    },
  ];
  const notIntergerIdMock = [
    {
      productId: 0.5,
      quantity: 1,
    },
  ];

module.exports = { reqValidMock, 
  missingIdMock, 
  missingQuantityMock, 
  invalidIdMock, 
  negativeIdMock, 
  notIntergerIdMock };