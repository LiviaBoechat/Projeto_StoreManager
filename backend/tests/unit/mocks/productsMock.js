const listAllProductsMock = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ];

  const oneProductMock = {
      id: 1,
      name: 'Martelo de Thor',
    };

  const insertionDbResponseMock = {
      id: 4,
      name: 'Trena',
  };
  
  const updateReturnMock = {
    id: 1,
    name: 'Capacete',
  };

  module.exports = { listAllProductsMock, 
    oneProductMock, 
    insertionDbResponseMock,
    updateReturnMock };