const { productModel } = require('../models'); // barrel é um objeto -> desesturar com {}

const findAll = async () => {
    const result = await productModel.findAll(); // dependencia externa
    // console.log(result);
    return { type: null, message: result };
};

const findById = async (id) => {
    const result = await productModel.findById(id); // dependencia externa
    // console.log(result);
    if (!result) return { type: 404, message: 'Product not found' };

    return { type: null, message: result };
};

const insert = async (name) => {
    const result = await productModel.insert(name);
    
    return { type: null, message: result };
};

const update = async (id, name) => {
    const result = await productModel.update(id, name); // dependencia externa
    // console.log(result);
    if (!result) return { type: 404, message: 'Product not found' };

    return { type: null, message: result };
};

module.exports = { findAll, findById, insert, update };