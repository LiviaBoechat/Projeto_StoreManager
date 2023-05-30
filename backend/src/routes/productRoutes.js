const express = require('express');
const { productController } = require('../controllers');
const { idValidation, 
    productNameValidation } = require('../middlewares/insertValidation');

const productRouter = express.Router();

productRouter.get('/', productController.findAll);  
productRouter.get('/:id', idValidation, productController.findById);  
productRouter.post('/', productNameValidation, productController.insert);  

module.exports = productRouter;