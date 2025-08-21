const express = require('express');
const { createProduct, getAllProduct } = require('../controllers/productControllers')


const router = express.Router();

router.get('/', getAllProduct)
router.post('/', createProduct)

module.exports = router;