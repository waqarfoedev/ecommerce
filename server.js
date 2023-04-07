import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRouter.js';
import categoryRoute from './routes/categoryRoute.js';
import cors from 'cors';

//config env
dotenv.config();

// rest object
const app = express();

//database config
connectDB();


// midale ware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// rest api
app.get('/', (req, res) => {
    res.send('<h1>Assalam o aliakum</h1>');
});

// PORT
const PORT = process.env.PORT || 8080;

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);

// run listen
app.listen(PORT, () => {
    console.log(`server runing on port:${PORT} `.bgWhite.black);
});