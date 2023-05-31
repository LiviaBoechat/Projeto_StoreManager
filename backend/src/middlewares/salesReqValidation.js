const { salesSchema } = require('../services/valiadations/schemas');

const validateProductId = (req, res) => {
  const map = req.body.map((eachProduct) => eachProduct.productId);
  if (map.includes(undefined)) return res.status(400).json({ message: 'productId is required' });
};

const validateQuantity = (req, res) => {
    const map = req.body.map((eachProduct) => eachProduct.productId);
    if (map.includes(undefined)) return res.status(400).json({ message: 'quantity is required' });
  };

  const salesInsertValidation = async (req, res, next) => {
    try {
      const fails = req.body.map((eachProduct) => eachProduct
      .map((eachValidation) => salesSchema.validate(eachValidation)));
      
      const greaterThanFail = fails.find((eachFail) => eachFail.message
      .includes('be greater than'));
      if (greaterThanFail) {
        return res.status(422).json({ message: 'quantity must be greater than or equal to 1' });
      }
      
      const isRequiredFail = fails.find((eachFail) => eachFail.message.includes('is required'));
      if (isRequiredFail) {
        return res.status(404).json({ message: 'is required' });
      }
      
      next();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  };

const salesReqValidation = async (req, res, next) => {
    validateProductId(req, res);
    validateQuantity(req, res);
    salesInsertValidation(req, res);
    
    next();
};

module.exports = { salesReqValidation };