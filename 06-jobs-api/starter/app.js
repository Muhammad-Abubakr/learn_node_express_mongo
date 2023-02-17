require('dotenv').config();
require('express-async-errors');

/* Imports */

/* 3rd-Party */
const express = require('express');

/* Local Imports */
const ConnectDB = require('./db/connect');

// Routes
const authentication = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

(
  async () => {
    try {
      /* Connect to the Database */
      await ConnectDB(process.env.MONGO_URI);
      console.log(`Connection Established to Database...\nSpinning up the SERVER...`);

      /* Server Instantiation */
      const app = express();

      /* Middlewares */
      // Parsing JSON data sent from the front-end client
      app.use(express.json());

      // routes
      app.get('/', (req, res) => {
        res.status(200).send('<h1>JOBS API</h1>');
      })

      app.use('/api/v1', authentication);

      app.use(notFoundMiddleware); /* Handling 404 Pages */
      app.use(errorHandlerMiddleware); /* Custom Error Handling */

      /* PORT configuration */
      const port = process.env.PORT || 3000;
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  }
)();

