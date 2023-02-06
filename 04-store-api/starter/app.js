/* Imports */
const express = require('express');
// db import
const connectDB = require('./db/connect');
// logger
const morgan = require('morgan');

// loading dotenv enviornment variables 
require('dotenv').config();


/* App Initialization */
// setting up an IIFE to connect to the DB and then spin up the server
(async () => {

    try {

        await connectDB(process.env.MONGO_URI);
        console.log(`Connect to the database: SUCCESS`);

        // Server instantiation
        const app = express();

        // middlewares
        app.use(morgan('dev')); /* logger */


        // routes

        /* Home Route */
        app.get('/', (req, res) => {
            res.status(200).send(`<h1>Store API</h1> <br> <a href='/api/v1/products'>products route</a>`)
        });


        /* 404 Pages */
        app.all('*', (req, res) => {
            res.status(404).send(`<h1>404 - Not Found!</h1>`)
        });

        // PORT configuration
        const port = process.env.PORT || 3000;
        app.listen(port, 'localhost', () => {
            console.log(`Listening on the PORT: ${port}...`);
        });


    } catch (err) {
        console.log(`An error occured while connecting to the database...\n${err}`);
    }

})();
