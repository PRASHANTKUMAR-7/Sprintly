const mongoose = require('mongoose');
const env = require('./env');

function connectDB() {
  return mongoose.connect(env.mongodbUri).then(() => {
    console.log(`[db] Connected to MongoDB`);
  });
}

module.exports = connectDB;
