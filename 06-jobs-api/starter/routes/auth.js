/* Express imports */
const express = require('express');

/* Controller Imports (local ofc) */
const { register, login } = require('../controllers/auth');

/* Instantiating Router */
const router = express.Router();

/* Defining Routes */
router.route('/register').post(register);
router.route('/login').post(login);

/* Exporting Router */
module.exports = router;