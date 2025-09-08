require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const { connectToMongoDB } = require('./libs/mongodb');
const toDoRoutes = require('./routes/toDoRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors')

//express app
const app = express();

const allowOrigins = [
    'https://supanat-shopping-web.netlify.app',
    'https://todo-list-crud-app.vercel.app'
]

//CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS")) 
        }
    },
    credentials: true,
}));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/api/auth/me", auth, (req, res) => {
    console.log(req.user)
    res.status(200).json(req.user);
});

app.use('/api/order', orderRoutes)

app.use('/api/auth', userRoutes)

//Static Files
app.use(express.static('public'));

app.use('/api/todo', toDoRoutes)

app.use('/api/product', productRoutes)

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