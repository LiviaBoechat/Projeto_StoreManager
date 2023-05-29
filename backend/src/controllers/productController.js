const { productService } = require('../services'); // barrel é um objeto -> desesturar com {}

const findAll = async (req, res) => {
    const result = await productService.findAll(); // dependencia externa
    res.status(200).json(result.message); // result.message pq message é a chave onde os dados estão no objeto retornado
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productService.findById(id);
    // console.log(type, message);
    if (type) return res.status(404).json({ message: 'Product not found' }); // se type for true, ele ñ retornou null (caso de sucesso)

    res.status(200).json(message); // service retorna os dados no message
};

const insert = async (req, res) => {
    const { name } = req.body;
    console.log(name);
    const { message } = await productService.insert(name);

    return res.status(201).json(message); // service retorna os dados no message
};

module.exports = { findAll, findById, insert };