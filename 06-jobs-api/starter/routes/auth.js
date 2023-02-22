/* Express imports */
const express = require('express');

/* Middlewares */
// local
const authentication = require('../middleware/authentication');

/* Controller Imports (local ofc) */
const { register, login } = require('../controllers/auth');

/* Instantiating Router */
const router = express.Router();

/* Defining Routes */
router.route('/register').post(register);
router.route('/login').post(authentication, login);

/* Exporting Router */
module.exports = router;