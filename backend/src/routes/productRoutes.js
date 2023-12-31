const express = require('express');
const { productController } = require('../controllers');
const { idValidation, 
    productNameValidation } = require('../middlewares/insertValidation');

const productRouter = express.Router();

productRouter.put(
    '/:id', 
    idValidation,
    productNameValidation, 
    productController.update,
    );
productRouter.get('/search', productController.findByQuery);
productRouter.get('/:id', idValidation, productController.findById);  
productRouter.delete('/:id', idValidation, productController.deleteProduct);  
productRouter.get('/', productController.findAll);   
productRouter.post('/', productNameValidation, productController.insert);  

module.exports = productRouter;