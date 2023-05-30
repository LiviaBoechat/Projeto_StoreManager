const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const addNameSchema = Joi.object({
    name: Joi.string().min(5).required(),
});

// const salesSchema = Joi.object({
//     productId: Joi.number().integer().positive().required(),
//     quantity: Joi.number().integer().positive().required(),
// });

// module.exports = {
//     salesSchema,
// };

module.exports = { idSchema, addNameSchema };