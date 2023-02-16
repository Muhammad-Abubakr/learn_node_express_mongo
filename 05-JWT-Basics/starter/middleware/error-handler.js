const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../error');

const customErrorHandler = (err, req, res, next) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ status: 'failure', msg: err.message });
    }


    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'failure', msg: `Something went wrong, try again. ERROR: ${err.message}` })
}
module.exports = customErrorHandler;