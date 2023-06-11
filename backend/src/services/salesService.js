const { salesModel } = require('../models'); // barrel é um objeto -> desesturar com {}
const { saleProductsValidation } = require('./valiadations/saleProductsValidation');
const { validateSaleUpdate } = require('./valiadations/validateSaleUpdate');

const findAll = async () => {
    const result = await salesModel.findAll(); // dependencia externa
    // console.log(result);
    return { type: null, message: result };
};

const findById = async (id) => {
    const result = await salesModel.findById(id); // dependencia externa
    if (result.length === 0) return { type: 404, message: 'Sale not found' };

    return { type: null, message: result };
};

const insert = async (bodyArray) => {
    // verifica se o(s) produto(s) exitem no db
    const { type, message } = await saleProductsValidation(bodyArray);
    if (type) return { type, message };
    // gerar id da nova compra. Ñ precisa parametro, apenas chamar a função q gera ID automático
    const saleId = await salesModel.insertSale(); 
    // usar o id gerado em cima p/ popular função addSalesAndProducts p/ fazer inserção na tabela sales_products
    const productPromise = bodyArray.map(({ productId, quantity }) => {
        const salesProduct = salesModel.addSalesAndProducts(saleId, productId, quantity);
        return salesProduct;
      });
    await Promise.all(productPromise); 
  
    return { type: null, message: { id: saleId, itemsSold: bodyArray } };
};

const deleteSale = async (id) => {
    const findId = await salesModel.findById(id);
    if (!findId || findId.length === 0) return { type: 404, message: 'Sale not found' };

    const result = await salesModel.deleteSale(id);

    return { type: null, message: result };
};

const update = async (saleId, productId, quantity) => {
    const { message } = validateSaleUpdate;
    if (message) return { type: 404, message };

    const [result] = await salesModel.update(saleId, productId, quantity);
    if (!result || result.length === 0) return { type: 404, message: 'Sale not found' }; 

    return { type: null, message: result };
  };

module.exports = { findAll, findById, insert, deleteSale, update };