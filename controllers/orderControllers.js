const Order = require('../models/orderModel')
const User = require('../models/userModel')

const createOrder = async (req, res) => {
    const orderDetail = req.body
    const userId = orderDetail.boughtUser

    try {
        const createdOrder = await Order.create(orderDetail)

        const updatedUserOrder = await User.findByIdAndUpdate(
            userId,
            { $push: {orderHistory: createdOrder }},
            { new: true }
        )
        res.status(200).json({ message: "Successfully create an order", order: createdOrder, user: userId })
    }
    catch(err) {
        console.log(err)
        res.status(400).json({ message: "Failed to create order"})
    }
}

module.exports = {
    createOrder
}