/* Imports */
require('dotenv').config();

/* 3rd party */
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

/* local */
const { BadRequestError, InternalServerError, ResourceExists } = require('../errors');

/* Model */
const User = require('../models/User');

/* Register */
const register = async (req, res) => {

    // Destructuring the data sent as json from client
    const { username, password } = req.body;

    console.log(username, password);

    // if either or both of them are absent, sent an error
    if (!username || !password) {

        throw new BadRequestError('Please provide both the Username and the Password.')
    }

    await User.deleteMany(); /* for testing only | comment out this line in production*/

    // check if the user already exists
    const alreadyExists = await User.findOne({ name: username });

    // if they do, then create a token (exclude the sensitive data) and send the token back
    if (!alreadyExists) {
        try {

            const user_snapshot = await User.create({ name: username, password })

            // create a token
            const token = jwt.sign({ id: user_snapshot._id }, process.env.JWT_SECRET);

            return res.status(StatusCodes.CREATED).json({ token });

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    // the resource already exists
    throw new ResourceExists(`The resource with the name ${username} already exists.`);
}

const login = (req, res) => {
    res.status(StatusCodes.OK).send('Login User');
}

module.exports = {
    register,
    login
}
