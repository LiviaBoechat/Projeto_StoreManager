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

const findMaxId = async () => {
  const [[product]] = await 
    connection.execute('SELECT max(id) AS id FROM StoreManager.products');
  
  return product.id;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute( 
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = { id: insertId, name };
  return result;
};

module.exports = { findAll, findById, findMaxId, insert };
