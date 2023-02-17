const CustomAPIError = require('./custom-api');
const { StatusCodes } = require('http-status-codes');


class ResourceExists extends CustomAPIError {
    constructor (message) {
        super(message);

        this.statusCode = StatusCodes.CONFLICT;
    }
}

module.exports = ResourceExists;