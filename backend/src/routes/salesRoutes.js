const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesController.findAll);  
salesRouter.get('/:id', salesController.findById);  

  module.exports = salesRouter;
