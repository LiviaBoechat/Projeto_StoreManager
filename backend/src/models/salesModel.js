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

 // 1. gerar o id automático da nova sale ao inseri-la na tabela sales
const insertSale = async () => {
    const query = 'INSERT INTO StoreManager.sales () VALUES ()';
    const [objeto] = await connection.execute(query);
    return objeto.insertId;
};

  // 2. inserir produtos na tabela sales_product
  const addSalesAndProducts = async (saleId, productId, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(query, [saleId, productId, quantity]);
    console.log('AQUI', result);
    return result;       
  };

module.exports = { findAll, findById, insertSale, addSalesAndProducts };