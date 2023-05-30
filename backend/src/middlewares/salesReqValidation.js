const { salesSchema } = require('../services/valiadations/schemas');

const validateProductId = (bodyArray, res) => {
  const map = bodyArray.map((eachProduct) => eachProduct.productId);
  if (map.includes(undefined)) return res.status(404).json();
};

const validateQuantity = (bodyArray, res) => {
    const map = bodyArray.map((eachProduct) => eachProduct.productId);
    if (map.includes(undefined)) return res.status(404).json();
  };

  const salesInsertValidation = async (req, res, next) => {
    try {
      const fails = req.body
      .map((eachProduct) => eachProduct
      .map((eachValidation) => salesSchema.validate(eachValidation)));
      
      const greaterThanFail = fails.find((eachFail) => eachFail.message
      .includes('be greater than'));
      if (greaterThanFail) {
        throw new Error(greaterThanFail.message);
      }
      
      const isRequiredFail = fails.find((eachFail) => eachFail.message.includes('is required'));
      if (isRequiredFail) {
        throw new Error(isRequiredFail.message);
      }
      
      next();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  };

const salesReqValidation = async (req, res, next) => {
    validateProductId(req.body, res);
    validateQuantity(req.body, res);
    salesInsertValidation(req.body, res);
    
    next();
};

module.exports = { salesReqValidation };