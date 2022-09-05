import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import studentRoute from './routes/studentRoute.js';
import userRoute from './routes/userRoute.js'
import mongoDBconnect from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path"


const __dirname = path.resolve()

//  init express
const app = express();
dotenv.config;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use cookie parser
app.use(cookieParser());
app.use(cors());

// init env variables
const port = process.env.PORT || 5000;

// routes
app.use(`/api/student`, studentRoute);
app.use(`/api/user`, userRoute);

// use express error handler
app.use(errorHandler);

// static folder
app.use(express.static( path.join(__dirname, 'public')));


// listen server
app.listen(port, () => {
    // mongoDB connect
    mongoDBconnect();

    console.log(`server is runing on port ${port}`.bgGreen.black);

})

