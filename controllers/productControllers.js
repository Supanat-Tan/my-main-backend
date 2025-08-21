const productModel = require('../models/productModel')

const getAllProduct = async (req, res) => {
    try {
        const result = await productModel.find();
        res.status(200).json(result);
    }
    catch(err) {
        res.status(400).json({ error: err.message });
        console.log(err)
    }
    
}

const createProduct = async () => {
    const { productName, price } = req.body;

    try {
        const result = await productModel.create({ productName, price });
        res.status(200).json(result);
    }
    catch(err) {
        res.status(400).json({ error: err.message })
        console.log(err)
    }
}

module.exports = {
    createProduct,
    getAllProduct
}