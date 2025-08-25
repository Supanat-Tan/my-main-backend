const productModel = require('../models/productModel')

const getAllProduct = async (req, res) => {
    try {
        const { productName } = req.query;
        let filter = {}

        if (productName) {
            filter.productName = new RegExp(productName, 'i')
            
            const result = await productModel.find(filter);
            res.status(200).json(result)
        }

        else {
            const result = await productModel.find();
            res.status(200).json(result);
        }

        
    }
    catch(err) {
        res.status(400).json({ error: err.message });
        console.log(err)
    }
    
}

const getOneProduct = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await productModel.findById(_id)

        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message });
        console.log(err)
    }
}

const createProduct = async (req, res) => {
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

const addRating = async (req, res) => {
    const _id = req.params.id;
    const { userId, score, comment } = req.body

    const product = await productModel.findById(_id)

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    try {

        //Check Duplicated
        const existRaing = product.rating.find(r => r.userId.equals(userId))
    
        if (existRaing) {
            existRaing.score = score;
            existRaing.comment = comment;
            existRaing.date = Date.now();
        }

        else {
            product.rating.push({
                userId,
                score,
                comment,
                date: Date.now()
            });
        }

        //recalculate Avg rating
        const allrating = product.rating;
        const totalScore = allrating.reduce((sum, eachRating) => sum + eachRating.score, 0)
        product.averageRating = allrating.length ? totalScore / allrating.length : 0;
        
        await product.save();
        res.status(200).json(product);
    }
    catch(err) {
        res.status(400).json({ error: err.message })
        console.log(err)
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    addRating,
    getOneProduct
}