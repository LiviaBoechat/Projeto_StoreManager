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

const update = async (id, name) => {
  const [[product]] = await 
    connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
 console.log(product);
    if (product) {
      await connection
      .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
      return { 
        id: Number(id), 
        name,
      };
    }
  
  return { message: 'Product not found' };
};

module.exports = { findAll, findById, findMaxId, insert, update };
