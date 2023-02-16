class CustomError extends Error {

    // constructor (msg, statusCode) {
    //     super(msg);
    //     this.statusCode = statusCode;
    // }

    constructor (message) {
        super(message);
    }
}

module.exports = CustomError;