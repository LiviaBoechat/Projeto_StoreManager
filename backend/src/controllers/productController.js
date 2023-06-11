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
    const { message } = await productService.insert(name);

    return res.status(201).json(message); // service retorna os dados no message
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await productService.update(id, name);
    // console.log(type, message);
    if (type) return res.status(404).json({ message: 'Product not found' }); // se type for true, ele ñ retornou null (caso de sucesso)

    res.status(200).json(message); // service retorna os dados no message
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type } = await productService.deleteProduct(id);
    if (type) return res.status(404).json({ message: 'Product not found' }); // se type for true, ele ñ retornou null (caso de sucesso)

    return res.status(204).json('');
  };

  const findByQuery = async (req, res) => {
    const { q } = req.query;
    const { type, message } = await productService.findByQuery(q);

    if (type) return res.status(200).json([]);

    res.status(200).json(message);
};

module.exports = { findAll, findById, insert, update, deleteProduct, findByQuery };