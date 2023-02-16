const { Unauthorized, BadRequest } = require('../error');
const jwt = require('jsonwebtoken');

/* AUTH middleware

   Check if there is a user session currently running, that is a jwt token is present
   for the user and if it is
   try and extract the user data/payload from the token and set it in the req body
   for the next middleware to access.
*/
const authentication = async (req, res, next) => {
    const auth_header = req.headers.authorization;

    // Checking the presence of the token and verifying its format
    if (!auth_header || !auth_header.startsWith('Bearer ')) {
        throw new BadRequest(`No Token present or Invalid`);
    }

    const auth_token = auth_header.split(' ')[ 1 ];

    // `Verifying the token using the signature` we used when signing the payload,
    // then `extracting` and `setting up` the data for the `next middleware`
    try {
        const decoded_data = jwt.verify(auth_token, process.env.SECRET, { complete: true });

        req.user = {
            id: decoded_data.payload.user_id,
            name: decoded_data.payload.username
        }
    } catch (error) {
        throw new Unauthorized(`Not authorized to access this route`);
    }

    next();
}


module.exports = authentication;