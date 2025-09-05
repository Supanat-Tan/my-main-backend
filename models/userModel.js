const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        orderHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: false,
            default: [],
        }]
    },

    {
        timestamps: true,
        collection: 'usersData'
    }
);

userSchema.statics.signup = async function (email, username, password) {
    //validation
    if (!email || !username || !password) {
        throw Error("All field must be filled");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("This Email already exist: ", email)
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, username, password: hash});

    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All field must be filled")
    }

    const user = await this.findOne({ email }).populate('orderHistory');

    if (!user) {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect Password");
    }

    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User