require('dotenv').config();

const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const { authorization } = req.headers;

    /* Check if the header exists and is of right format */
    if (!authorization || !authorization.includes("Bearer ")) {
        throw new BadRequestError("No token found or badly formatted!")
    }

    // if it does exist
    const auth_token = authorization.split(' ')[ 1 ];

    const { header, payload, signature } = jwt.verify(auth_token, process.env.JWT_SECRET, { complete: true });

    // add the user object with it's id to the req body
    req.body.user = { _id: payload.id };

    next();
}


module.exports = authentication;