const { salesSchema } = require('./schemas');

const validateProductId = (req, res, next) => {
  const map = req.body.map((eachProduct) => eachProduct.productId);
  if (map.includes(undefined)) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validateQuantity = (req, res, next) => {
    const map = req.body.map((eachProduct) => eachProduct.quantity);
    if (map.includes(undefined)) return res.status(400).json({ message: '"quantity" is required' });
    next();
  };

  const salesInsertValidation = async (req, res, next) => {
      const fails = req.body.map((eachProduct) => {
        const test = salesSchema.validate(eachProduct).error;
        if (!test) return undefined;
        return test.details[0].message;
      });
      // console.log(fails);
      const greaterThanFail = fails.includes('"quantity" must be a positive number');
      console.log(greaterThanFail);
      if (greaterThanFail) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
      }
      
      const isRequiredFail = fails.includes('is required');
      if (isRequiredFail) {
        return res.status(404).json({ message: 'is required' });
      }
      next();
  };

module.exports = { validateProductId, validateQuantity, salesInsertValidation };