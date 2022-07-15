const db = require("../models");
const { validation, isAlphanumeric } = require("../lib/validator");
const { generateToken } = require("../lib/jwt");

const User = db.users;
const UserRole = db.user_roles

module.exports = {
  /**
   * Use to register a user 
   * @param {*} req 
   * @param {*} res 
   */
  signUp: async (req, res) => {
    try {

      validation(req.body, ['username', 'password', 'role']);

      if (!isAlphanumeric(req.body.password)) {
        throw {
          message: 'Password should be alphanumeric',
          code: 400
        }
      }

      let validRole = await UserRole.getRoleById(req.body.role)
      if (!validRole) {
        throw {
          message: 'Invalid role',
          code: 400
        }
      }

      let exist = await User.getUser(req.body.username);
      if (exist.length) {
        throw {
          message: 'Username already taken',
          code: 409
        }
      }

      await User.registerUser(req.body);

      res.status(201).send({
        message: "User registered successfully."
      });

    } catch (err) {
      res.status(err.code || 500).send({
        message:
          err.message || "Something went wrong"
      });
    }
  },

  /**
   * Use to login a user 
   * @param {*} req 
   * @param {*} res 
   */
  login: async (req, res) => {
    try {
      validation(req.body, ['username', 'password']);

      let userData = await User.getUser(req.body.username);

      if (!userData.length) {
        throw {
          message: 'Invalid username/password',
          code: 401
        }
      }

      const valid = User.validPassword(req.body.password, userData[0].password);

      if (!valid) {
        throw {
          message: 'Invalid username/password',
          code: 401
        }
      }

      let accessToken = generateToken(userData[0].id)


      res.status(200).send({
        id: userData[0].id,
        username: userData[0].username,
        accessToken: accessToken
      });

    } catch (err) {
      res.status(err.code || 500).send({
        message:
          err.message || "Something went wrong"
      });
    }

  }
}