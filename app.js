import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import movieRouter from './routes/movie.route.js';
import theaterRouter from './routes/theater.route.js';
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.set("debug", true);

app.use("/mba/api/v1", movieRouter);
app.use("/mba/api/v1", theaterRouter);
app.use("/mba/api/v1", authRouter);

app.get('/home',(req,res)=>{
    return res.json({
        success: true,
        message: "fetching home"
    })
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Failed to connect to DB", err);
})