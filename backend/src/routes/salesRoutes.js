const express = require('express');
const { salesController } = require('../controllers');
const { validateProductId, 
    validateQuantity, salesInsertValidation } = require('../middlewares/salesReqValidation');

const salesRouter = express.Router();

salesRouter.get('/', salesController.findAll);  
salesRouter.get('/:id', salesController.findById);  
salesRouter.post(
'/', 
validateProductId,
validateQuantity,
salesInsertValidation,
salesController.insert,
); 

module.exports = salesRouter;
