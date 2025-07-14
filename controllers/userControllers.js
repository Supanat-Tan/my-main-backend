const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: "1d"});
}

const signupUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.signup(email, username, password);
        res.status(201).json({ message: 'User successfully created', user: user });

    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({
            token, user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch(err) {
        console.error(err.message);

        if (err.message === "Incorrect Email" || err.message === "Incorrect Password") {
        return res.status(401).json({ error: err.message });
        }

        if (err.message === "All fields must be filled") {
        return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    loginUser,
    signupUser,
}