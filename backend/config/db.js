const mongoose = require('mongoose');


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-resume-ats';

        if (!process.env.MONGO_URI) {
            console.log("⚠️ MONGO_URI missing. Trying local MongoDB...");
        }

        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(mongoURI, opts).then((mongoose) => {
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

module.exports = connectDB;
