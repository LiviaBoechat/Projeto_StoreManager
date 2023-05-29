const connection = require('./connection');

const findAll = async () => {
    const [result] = await 
      connection.execute('SELECT * FROM StoreManager.products ORDER BY id ASC');
      // console.log(result);
      
    return result;
};

const findById = async (id) => {
    const [[product]] = await 
      connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
    
    return product;
};

module.exports = { findAll, findById };