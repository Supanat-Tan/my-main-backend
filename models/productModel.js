const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        soldAmount: {
            type: Number,
            default: 0
        },
        rating: {
            type: [ratingSchema],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'productsData'
    }
);

const ratingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        score: {
            type: Number,
            min: 1,
            max: 5,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;