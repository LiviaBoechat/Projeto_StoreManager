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
    const findId = await productModel.findById(id);
    if (!findId) return { type: 404, message: 'error' };

    const result = await productModel.update(id, name); // dependencia externa
    // console.log(result);
    if (result === 'Product not found') return { type: 404, message: 'Product not found' };

    return { type: null, message: result };
};

const deleteProduct = async (id) => {
    const findId = await productModel.findById(id);
    if (!findId) return { type: 404, message: 'Product not found' };

    const result = await productModel.deleteProduct(id);

    return { type: null, message: result };
};

const findByQuery = async (query) => {
    if (!query || query === undefined) {
        const allProducts = await productModel.findAll();  
        return { type: null, message: allProducts };
    }

    const result = await productModel.findByQuery(query); 
    if (!result) return { type: 200, message: [] };

    return { type: null, message: result };
};

module.exports = { findAll, findById, insert, update, deleteProduct, findByQuery };