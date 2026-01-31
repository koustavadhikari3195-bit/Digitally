const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-resume-ats';

        if (!process.env.MONGO_URI) {
            console.log("⚠️ MONGO_URI missing. Trying local MongoDB...");
        }

        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        isConnected = true;
    } catch (error) {
        console.error(`⚠️ MongoDB Connection Failed: ${error.message}`);
        console.log('🚀 Server will continue without database. Some features may be limited.');
        isConnected = false;
        // Do NOT exit - allow server to run without DB for AI features
    }
};

const isDBConnected = () => isConnected;

module.exports = connectDB;
module.exports.isDBConnected = isDBConnected;
