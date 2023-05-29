const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productController.findAll);  
productRouter.get('/:id', productController.findById);  
productRouter.post('/', productController.insert);  

module.exports = productRouter;