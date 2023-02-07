const express = require('express');

// Instantiating a router
const router = express.Router();

// Requiring Controllers
const products = require('../controllers/products');


// Setting up handlers
router.route('/').get(products.getAllProducts);
router.route('/:id').get(products.getProduct).delete(products.deleteProduct);
router.route('/static').get(products.getAllProductsStatic);


module.exports = router;