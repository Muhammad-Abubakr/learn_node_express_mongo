const CustomError = require('../error/custom-error');
const jwt = require('jsonwebtoken');

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;


    /* Three types of validations can be done
       - Mongoose Validations (database default validations - set in the schema during design)
       - JOI (third-party) adds a validation layer
       - Check in the controller (which we are doing here)
    */
    if (!username || !password) {

        throw new CustomError("Please provide both the username and password.", 400);
    }

    /* 
        creating a token assuming the values(username, password) are provided
        syntax: jwt.sign(payload, secret);

        try to keep the payload as small as possible for better UX
    */

    const token = jwt.sign({ username, password }, process.env.SECRET, { expiresIn: '3h' });


    res.status(200).json({ status: 'success', msg: 'user created', token });

}


/* Dashboard */
const dashboard = async (req, res) => {

    const luckyNumber = Math.round(Math.random() * 100);

    // res.status(200).json({ status: 'success', data: `<p>Hello Abubakr, here is your secret  data</p><br><p>Your lucky number: ${luckyNumber}</p>` });
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Here is your authorized data. Your lucky number: ${luckyNumber}` });

}

module.exports = {
    login,
    dashboard
}