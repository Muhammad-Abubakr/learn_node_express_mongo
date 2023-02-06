/* IMPORTS */
const express = require('express');
// morgan logger
const morgan = require('morgan');
// require routes
const tasks = require('./routes/tasks');
// Database connection
const { connectDB } = require('./db/connect');
// Other
const { notFound } = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config(); // accessing secret variables

// Initializing the connection
const start = async () => {
    try {
        // Trying to establish connection with MongoDB
        await connectDB(process.env.MONGO_URI);
        console.log('Connection Established...');

        // If Established, then spin-up the Node/Express server
        // instantiation
        const app = express();

        /* Middlewares Setup */
        // Loggers
        app.use(morgan('dev'));
        // Parsers
        app.use(express.json()) // for data send and received through javascript as json

        /* Routes */
        // express static
        app.use(express.static('./public'));
        // API Routes
        app.use('/api/v1/tasks', tasks);
        // Other Routes
        app.use(notFound);
        // Error Handling
        app.use(errorHandlerMiddleware);

        // PORT setup
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Listening on the PORT: ${PORT}...`);
        })

    } catch (error) {
        console.log(error);
    }
}

// Start the Application
start();