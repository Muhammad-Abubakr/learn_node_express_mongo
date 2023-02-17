const mongoose = require('mongoose');

// Setting up the Schema for the product using MONGOOSE library
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Must Provide a Name for the Product.' ],
        trim: true,
    },
    price: {
        type: Number,
        required: [ true, 'Price must be set for the Product.' ],
    },
    featured: {
        type: Boolean,
    },
    company: {
        type: String,
        required: [ true, 'Must Provide a company name.' ],
        trim: true,
        enum: {
            values: [ 'ikea', 'liddy', 'caressa', 'marcos' ],
            message: '{VALUE} is not a valid value.'
        }
        // enum: [ 'ikea', 'liddy', 'caressa', 'marcos' ]
    },
    rating: {
        type: Number,

    },
});


// Setting up a model from the Products Schema
const Product = mongoose.model('product', ProductSchema);

// exporting the model
module.exports = Product;