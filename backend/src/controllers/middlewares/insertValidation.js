const { idSchema, addNameSchema } = require('./schemas');

// Middleware para validar o ID (colocar na rota em routes)
function idValidation(req, res, next) {
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  }

  // Middleware para validar o nome (colocar na rota em routes)
function productNameValidation(req, res, next) {
    const { error } = addNameSchema.validate(req.body);
    console.log('aquiiiii', error.details[0].type);
    if (error) {
        const newStatus = error.details[0].type === 'any.required' ? 400 : 422;
      return res.status(newStatus).json({ message: error.message });
    }
    next();
  }
  // 
module.exports = { productNameValidation, idValidation };