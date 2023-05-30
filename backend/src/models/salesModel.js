const connection = require('./connection');

const findAll = async () => {
   const query = `SELECT
                     s.id AS saleId,
                     s.date,
                     sp.product_id AS productId,
                     sp.quantity
                  FROM StoreManager.sales AS s
                  INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
                  ORDER BY
                  s.id ASC,
                  sp.product_id ASC`;

    const [result] = await 
      connection.execute(query);
    // console.log(result);
      
    return result;
};

const findById = async (id) => {
    const query = `SELECT 
                     s.date,
                     sp.product_id AS productId, 
                     sp.quantity
                  FROM StoreManager.sales AS s
                  INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id
                  WHERE sp.sale_id = ?
                  ORDER BY 
                    s.id ASC, 
                    sp.product_id ASC`;

    const [result] = await connection.execute(query, [id]);
    
    return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute( 
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [name],
  );
  const result = { id: insertId, name };
  return result;
};

module.exports = { findAll, findById, insert };