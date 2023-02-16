/* Express Imports */
const express = require('express');

/* Local Imports */
const { login, dashboard } = require('../controllers/main');

/* Middleware Imports */
const authMiddleware = require('../middleware/auth');

/* Router Instation */
const router = express.Router();

// Routes
router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard);

// exports
module.exports = router;