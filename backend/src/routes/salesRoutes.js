const express = require('express');
const { salesController } = require('../controllers');
const { validateProductId, 
    validateQuantity, salesInsertValidation } = require('../middlewares/salesReqValidation');
const { idValidation } = require('../middlewares/insertValidation');
const { updateProductValidation } = require('../middlewares/updateProductValidation');

const salesRouter = express.Router();

salesRouter.put(
    '/:saleId/products/:productId/quantity', 
    updateProductValidation,
    salesController.update,
);
salesRouter.get('/:id', salesController.findById); 
salesRouter.delete('/:id', idValidation, salesController.deleteSale);  
salesRouter.get('/', salesController.findAll);  
salesRouter.post(
'/', 
validateProductId,
validateQuantity,
salesInsertValidation,
salesController.insert,
); 

module.exports = salesRouter;
