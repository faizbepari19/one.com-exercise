const { verifyToken } = require("../lib/jwt");
const db = require("../models");

const User = db.users;
const UserRolePermission = db.user_role_permissions;

const METHODS = {
    'GET': 'fetch',
    'POST': 'create',
    'PUT': 'update',
    'PATCH': 'update',
    'DELETE': 'delete'
};

module.exports = {
    /**
     * A middleware method to verify the token in the request
     */
    authClient: async (req, res, next) => {
        try {
            let decoded = await verifyToken(req.headers.token);

            let exist = await User.getUserById(decoded.user_id);

            if (!exist) {
                throw { message: 'Unauthorized!' }
            }

            req.user_id = decoded.user_id;

            next();
        } catch (err) {
            res.status(401).send({
                message: 'Authentication failed'
            })
        }
    },

    /**
     * A middleware method check the authorisation of the user
     */
    ACL: async (req, res, next) => {
        try {
            const access = await UserRolePermission.checkAccess(req.user_id, METHODS[req.method]);
            console.log(access)
            if (!access.length) {
                throw { message: 'Unauthorized!!' }
            }
            next();
        } catch (err) {
            res.status(401).send({
                message: 'Not authorized to access endpoint'
            })
        }
    }
}