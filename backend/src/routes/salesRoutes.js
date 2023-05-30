const express = require('express');
const { salesController } = require('../controllers');
const { salesReqValidation } = require('../middlewares/salesReqValidation');

const salesRouter = express.Router();

salesRouter.get('/', salesController.findAll);  
salesRouter.get('/:id', salesController.findById);  
salesRouter.post('/', salesReqValidation, salesController.insert);  

module.exports = salesRouter;
