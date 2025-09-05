const productModel = require('../models/productModel')

const getAllProduct = async (req, res) => {
    try {
        const { productName } = req.query;
        let filter = {}

        const { soldAmount } = req.query;
        if (soldAmount === "most") {
            const result = await productModel.find().sort({ soldAmount: -1 }).limit(4);
            res.status(200).json(result)
            return;
        }

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

const updateSoldAmount = async (req, res) => {
    const soldProducts = req.body;

    if (!Array.isArray(soldProducts)) {
        res.status(400).json({ message: 'Invalid input format. Expecting Array'});
    }

    try {
        const bulkOps = soldProducts.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { soldAmount: item.quantity } },
            }
        }));

        await productModel.bulkWrite(bulkOps);

        const updatedProductId = soldProducts.map(item => item._id);

        const updatedProduct = await productModel
        .find({ _id: { $in: updatedProductId } })
        .select({ productName: 1, soldAmount: 1});

        res.status(200).json({ message: 'Update sell amount successfully', updatedProduct})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server error while updating products' });
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    addRating,
    getOneProduct,
    updateSoldAmount
}