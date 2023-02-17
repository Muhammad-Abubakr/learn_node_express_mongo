/* Imports */

/* 3rd party */
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

/* local */
const { BadRequestError, CustomAPIError } = require('../errors');

/* Model */
const User = require('../models/User');

/* Register */
const register = async (req, res) => {

    // Destructuring the data sent as json from client
    const { username, password } = req.body;

    // if either or both of them are absent, sent an error
    if (!username || !password) {
        throw new BadRequestError('Please provide both the Username and the Password.')
    }

    // if they do, then create a token (exclude the sensitive data) and send the token back
    try {
        const result = await User.create({ name: username, password })

        res.status(StatusCodes.CREATED).json({ data: result });

    } catch (error) {
        throw new CustomAPIError('An error occured while creating the user.');
    }

}

const login = (req, res) => {
    res.status(200).send('Login User');
}

module.exports = {
    register,
    login
}
