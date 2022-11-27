const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/filmtop";

let cached = global.mongodb;

if (!MONGODB_URI) throw new Error("Your mongodb URI is not defined!");

if (!cached) cached = global.mongodb = { conn: null, promise: null };

module.exports = async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGODB_URI).then((client) => {
      return client;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
