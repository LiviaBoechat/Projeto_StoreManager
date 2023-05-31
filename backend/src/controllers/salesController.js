const { salesService } = require('../services'); // barrel é um objeto -> desesturar com {}

const findAll = async (req, res) => {
    const result = await salesService.findAll(); // dependencia externa
    res.status(200).json(result.message); // result.message pq message é a chave onde os dados estão no objeto retornado
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.findById(id);
    if (type) return res.status(404).json({ message: 'Sale not found' }); // se type for true, ele ñ retornou null (caso de sucesso)

    return res.status(200).json(message); // service retorna os dados no message
};

const insert = async (req, res) => {
    const salesArray = req.body;
    const { type, message } = await salesService.insert(salesArray); // lembrar que aqui o body é um ARRAY c/ várias objetos de sales
    if (type) return res.status(404).json({ message: 'Product not found' });

    return res.status(201).json(message); // service retorna os dados no message
};

module.exports = { findAll, findById, insert };