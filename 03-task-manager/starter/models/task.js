const mongoose = require('mongoose');

// Defining the Schema 
// (When created a model from this schema, only the properties in this schema will be 
// used and other properties will be ignored when instantiating a document through the 
// model constructor.)
const TaskSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        // required: true
        required: [ true, 'Must provide a value.' ],
        trim: true,
        maxlength: [ 20, 'name cannot be more than 20 characters.' ]
    },
    completed: {
        type: Boolean,
        // default: false, // Provide default if not using put or replacement 
    }
});

// Creating a Model for Task and exporting
module.exports = mongoose.model('Task', TaskSchema);