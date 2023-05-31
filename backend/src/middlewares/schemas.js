const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const addNameSchema = Joi.object({
    name: Joi.string().min(5).required(),
});

// não é a melhor estratégia usar joi para validar isso.. depois p/ achar as msgs de erro fornecida pelo Joi é + difícil (documentação joi). Mais fácil fazer na mão as validações.
const salesSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required(),
});

module.exports = { idSchema, addNameSchema, salesSchema };