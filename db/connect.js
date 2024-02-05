const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });
const DB = process.env.CONNECTION_STRING.replace('<password>', process.env.PASSWORD);
const connectDB = () => {
    return mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });
};

module.exports = connectDB
