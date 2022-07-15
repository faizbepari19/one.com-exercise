const jwt = require("jsonwebtoken");
const utils = require("util");


module.exports = {
    /**
     * 
     * @param {*} user_id 
     * @returns a jwt token
     */
    generateToken: (user_id) => {
        const token = jwt.sign({ user_id: user_id }, process.env.SECRET, {
            expiresIn: parseInt(process.env.TOKEN_EXPIRY) // 24 hours
        });

        return token;
    },

    /**
     * 
     * @param {*} token 
     * @returns the decoded token or throws error if invalid
     */
    verifyToken: (token) => {
        const decoded = utils.promisify(jwt.verify)(token, process.env.SECRET);
        return decoded;
    }
}