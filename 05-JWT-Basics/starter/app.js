/* Static imports */
require('dotenv').config();
require('express-async-errors');

/* Express imports */
const express = require('express');

/* Local imports */
const customErrorHandler = require('./middleware/error-handler');
const mainRouter = require('./routes/main');

/* Initialization */
(
  async () => {
    try {
      /* App Instantiation */
      const app = express();

      /* middleware */

      // express middlewares
      app.use(express.static('./public'));
      app.use(express.json());

      // Router
      app.use('/api/v1', mainRouter);

      // local middlewares
      app.use(customErrorHandler);

      /* PORT Configuration */
      const port = process.env.PORT || 3000;
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  }
)();

