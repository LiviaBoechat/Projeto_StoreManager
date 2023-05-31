const { productModel } = require('../../models');

// campo productId inexistente no db
const saleProductsValidation = async (req) => {
  const allIds = req.map((eachProduct) => eachProduct.productId);
  const verifyAllIds = await productModel.findMaxId();
  const verifyId = allIds.some((eachId) => eachId > verifyAllIds);
  if (verifyId) return { type: 404, message: 'Product not found' };
  return { type: null, message: 'Product exists' };
};

module.exports = { saleProductsValidation };
