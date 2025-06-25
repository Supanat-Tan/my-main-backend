require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');

//express app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Static Files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
        mssg: "Welcome!"
    });
});

//Starting server
async function main() {
    try {
        app.listen(3000, () => {
            console.log('Listening on port 3000')
        })

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed due to app interruption");
            process.exit(0);
        })

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        })
    }
    catch(err) {
        console.log('Error starting server: ', err)
    }
};

main()