import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected: ${conn.connection.host} `);

    } catch (error){
        console.log("Error while connecting to the database", error.message);
        process.exit(1);  // 1 is for failure and 0 is for success
    }
}