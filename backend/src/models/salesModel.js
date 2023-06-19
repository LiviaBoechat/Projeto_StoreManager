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
    return result;       
  };

  const deleteSale = async (id) => {
    await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
    return true;
  };

  const findSaleProduct = async (saleId, productId) => {
    const [result] = await connection.execute(
      `SELECT
        s.date,
        sp.product_id AS productId,
        sp.quantity,
        sp.sale_id AS saleId
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ? AND product_id = ?`,
      [saleId, productId],
    );
    return result;
  };
  
  const update = async (saleId, productId, quantity) => {
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
     [quantity, saleId, productId],
    );
    
    // retorno do produto modificado da sale depois do update
    const [result] = await findSaleProduct(saleId, productId);
    return result;
  };  

module.exports = { findAll, 
  findById, 
  insertSale, 
  addSalesAndProducts, 
  deleteSale, 
  findSaleProduct, 
  update };