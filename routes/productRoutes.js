const express = require('express');
const { createProduct, getAllProduct, addRating, getOneProduct, updateSoldAmount } = require('../controllers/productControllers')


const router = express.Router();

router.get('/', getAllProduct)
router.get('/:id', getOneProduct)
router.post('/', createProduct)
router.patch('/sell', updateSoldAmount)
router.patch('/:id', addRating)

module.exports = router;