const mongoose = require('mongoose');

const productArraySchema = new mongoose.Schema(
    {
        _id: String,
        productName: String,
        price: Number,
        quantity: Number
    }
)

const orderSchema = new mongoose.Schema(
    {
        boughtUser: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        product: {
            type: [productArraySchema],
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        collection: 'orderData'
    }
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order