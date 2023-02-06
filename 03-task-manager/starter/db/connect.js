const mongoose = require('mongoose');

// settings to suppress deprecatio warnings
mongoose.set('strictQuery', false);

// Options/URI string
// const connectionString = "";

// trying connection
const connectDB = (url) => mongoose.connect(url);

// export
module.exports = { connectDB };