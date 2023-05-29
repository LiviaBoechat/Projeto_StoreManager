const { salesModel } = require('../models'); // barrel é um objeto -> desesturar com {}

const findAll = async () => {
    const result = await salesModel.findAll(); // dependencia externa
    // console.log(result);
    return { type: null, message: result };
};

const findById = async (id) => {
    const result = await salesModel.findById(id); // dependencia externa
    console.log(result);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };

    return { type: null, message: result };
};

module.exports = { findAll, findById };