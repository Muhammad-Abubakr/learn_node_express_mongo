const asyncWrapper = (fn) =>

    // Since we return a function from the wrapper which then is referenced by our controller
    // whose reference we will pass to the Request method, which passes the (req, res, next) 
    // arguments to its callback function
    async (req, res, next) => {
        try {

            // executing the param fn.
            await fn(req, res);
        } catch (err) {

            // Since express contains a middleware to handle errors we can just pass 
            // our error to that middleware and it does the handling for us.
            next(err);
        }
    }


module.exports = asyncWrapper;