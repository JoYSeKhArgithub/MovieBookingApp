import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ()=>{
    try {
        const connectionInstace = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`\n MongoDB connected successfully and DB HOST is : ${connectionInstace.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed: ",error);
        process.exit(1);
    }
}

export default connectDB;