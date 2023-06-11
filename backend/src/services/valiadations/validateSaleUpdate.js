const { salesModel } = require('../../models');

const validateSaleUpdate = async (req, res, next) => {
  const { saleId, productId } = req.params;
  
  // valida se a sale existe no banco
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  
  // valida se o productId existe na sale do banco
  const getProductsId = sale.map((eachProduct) => eachProduct.productId);
  if (!getProductsId.includes(productId)) {
    return res.status(404).json({ message: 'Product not found in sale' }); 
  }

  next();
};

module.exports = { validateSaleUpdate };