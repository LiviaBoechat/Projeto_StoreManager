const listAllSalesMock = [
    {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 1,
        quantity: 1,
    },
    {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 2,
        quantity: 1,
    },
];

const oneSaleMock = {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 1,
        quantity: 1,
    };

    const salesMock = [
        {
            productId: 1,
            quantity: 10,
        },
        {
            productId: 2,
            quantity: 60,
        },
    ];

    const postSaleReturnMock = { 
        id: 10, 
        itemsSold: [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 60,
          },
        ],
    };

module.exports = {
    listAllSalesMock,
    oneSaleMock,
    postSaleReturnMock,
    salesMock,
};