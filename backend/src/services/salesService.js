const { salesModel } = require('../models'); // barrel é um objeto -> desesturar com {}

const findAll = async () => {
    const result = await salesModel.findAll(); // dependencia externa
    // console.log(result);
    return { type: null, message: result };
};

const findById = async (id) => {
    const result = await salesModel.findById(id); // dependencia externa
    console.log(result);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };

    return { type: null, message: result };
};

const insert = async (bodyArray) => {
    // const verifyProduct = await // forEach + includes p/ cada obj do array sales
    // if (verifyProduct.length === 0) return { type: 400, message: 'Product does not exist' };

    const saleId = await salesModel.insertSale(); 
    const productPromise = bodyArray.map(({ productId, quantity }) => {
        const salesProduct = salesModel.addSalesAndProducts(saleId, productId, quantity);
        return salesProduct;
      });
    await Promise.all(productPromise); 
  
    return { type: null, message: { id: saleId, itemsSold: bodyArray } };
};

module.exports = { findAll, findById, insert };