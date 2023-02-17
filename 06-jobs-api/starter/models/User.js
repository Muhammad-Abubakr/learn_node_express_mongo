/* Imports */
const mongoose = require('mongoose');

/* Defining the Schema */
const User = mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Please provide a name' ],
        trim: true
    },
    password: {
        type: String,
        required: [ true, 'Please provide a password (a combination of letters and digits)' ],
        trim: true
    },

});

// Exporting as a Model
module.exports = mongoose.model('user', User);