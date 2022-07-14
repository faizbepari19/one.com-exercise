const jwt = require("jsonwebtoken");
const utils = require("util");


module.exports = {
    generateToken: (user_id) => {
        const token = jwt.sign({ user_id: user_id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        return token;
    },

    verifyToken: (token) => {
        const decoded = utils.promisify(jwt.verify)(token, process.env.SECRET);
        return decoded;
    }
}