/* Importing the Products Model since that is the which our database will accept */
const Product = require('./models/product');

/* to parse the JSON data obtained from the json file */
const { readFile } = require('fs').promises;

/* importing mongoose to create the documents in the mongo database */
const mongoose = require('mongoose');

/* setting up the environment variables */
require('dotenv').config();

/* PROCESS */
(async () => {

    try {
        // Connect to the mongo database using the connection-string / mongo_uri
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Successfull...`);

        // Acquiring the data from the json file
        const products_json = await readFile('./products.json', 'utf-8');
        const products = JSON.parse(products_json);

        // Create a Document based on the schema design in the database 
        // the collection for the database will automatically be created
        // using the plural for the document name.
        console.log(products.length);
        // products.forEach(async (product) => {
        //     await Product.create(product, (err, created_product) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log(created_product);
        //         }
        //     })
        // });
    }
    catch (err) {
        console.log(err);
    }
}
)();
