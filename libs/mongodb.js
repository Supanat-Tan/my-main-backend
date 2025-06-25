const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;

        if (!URI) {
            throw new Error("MongoDB URI is invalid");
        }

        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    }

    catch(err) {
        console.log("Error connecting to MongoDB: ", err.message)
        process.exit(1);
    }
};

module.exports = { connectToMongoDB };