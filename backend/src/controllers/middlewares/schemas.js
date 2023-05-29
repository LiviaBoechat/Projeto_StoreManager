const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const addNameSchema = Joi.object({
    name: Joi.string().min(5).required(),
});

module.exports = { idSchema, addNameSchema };