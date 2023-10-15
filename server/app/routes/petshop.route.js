const express = require('express');
const product = require('../controllers/Product/product.controller');

const router = express.Router();

router.route('/').get(product.home);
router.route('/product').get(product.getAllProduct).post(product.createProduct);

module.exports = router;
