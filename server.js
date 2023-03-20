import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

//config env
dotenv.config()

// rest object
const app=express()

//database config
connectDB()


// midale ware
app.use(express.json())
app.use(morgan('dev'))

// rest api
app.get('/', (req, res)=>{
    res.send('<h1>Assalam o aliakum</h1>')
})

// PORT
const PORT=process.env.PORT || 8080

// run listen
app.listen(PORT, ()=>{
    console.log(`server runing on port:${PORT} ` .bgWhite.black)
})