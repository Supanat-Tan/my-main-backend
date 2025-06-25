require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const { connectToMongoDB } = require('./libs/mongodb')
const toDoRoutes = require('./routes/toDoRoutes')

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

app.use('/api/todo', toDoRoutes)

app.get('/', (req, res) => {
    res.json({
        mssg: "Welcome!"
    });
});

//Starting server
async function main() {
    try {
        connectToMongoDB()
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log('Listening on port 3000')
            })
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