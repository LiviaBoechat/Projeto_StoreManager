const { salesModel } = require('../../models');

const validateSaleUpdate = async (saleId, productId) => {  
  // valida se a sale existe no banco
  const sale = await salesModel.findById(saleId);
 
  if (sale.length === 0 || sale === undefined) {
    return { type: 404, message: 'Sale not found' };
  }

  // valida se o productId existe na sale do banco
  const getProductsId = sale.map((eachProduct) => eachProduct.productId);
 
  if (!getProductsId.includes(+productId)) {
    return { type: 404, message: 'Product not found in sale' }; 
  }
  return { type: null, message: 'sucess' };
};

module.exports = { validateSaleUpdate };