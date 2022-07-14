const db = require("../models");
const { validation } = require("../lib/validator");
const { generateToken } = require("../lib/jwt");

const User = db.users;
const UserRole = db.user_roles

module.exports = {
  signUp: async (req, res) => {
    try {

      validation(req.body, ['username', 'password', 'role']);

      let validRole = await UserRole.getRoleById(req.body.role)
      if (!validRole) {
        throw {
          message: 'Invalid role'
        }
      }

      let exist = await User.getUser(req.body.username);
      if (exist.length) {
        throw {
          message: 'Username already taken'
        }
      }

      await User.registerUser(req.body);

      res.send({
        message: "User registered successfully."
      });

    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Something went wrong"
      });
    }
  },

  login: async (req, res) => {
    try {
      validation(req.body, ['username', 'password']);

      let userData = await User.getUser(req.body.username);

      if (!userData.length) {
        throw {
          message: 'Invalid creds'
        }
      }

      const valid = User.validPassword(req.body.password, userData[0].password);

      if (!valid) {
        throw {
          message: 'Invalid creds'
        }
      }

      let accessToken = generateToken(userData[0].id)


      res.status(200).send({
        id: userData[0].id,
        username: userData[0].username,
        accessToken: accessToken
      });

    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Something went wrong"
      });
    }

  }
}