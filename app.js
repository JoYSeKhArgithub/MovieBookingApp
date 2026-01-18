import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import movieRouter from './routes/movie.route.js';
import theaterRouter from './routes/theater.route.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use("/mba/api/v1", movieRouter);
app.use("/mba/api/v1", theaterRouter);

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