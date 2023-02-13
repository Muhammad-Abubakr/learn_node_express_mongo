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

        const result = await Product.deleteMany(); // delete all documents in the model
        console.log(`Deleted: ${result.deletedCount}`);
        // Create a Document based on the schema design in the database
        // the collection for the database will automatically be created
        // using the plural for the document name.


        // Following code is a bit confusing, let's do it in a different manner
        // await products.forEach(async (product) => {

        //     if (!product.featured) {
        //         product.featured = false;
        //     }

        //     await Product.create(product);
        // });

        products.forEach(product => {

            if (!product.featured) {
                product.featured = false;
            }

            product = new Product(product);
            product.save().then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        });
    }
    catch (err) {
        console.log(err);
    }
})();
