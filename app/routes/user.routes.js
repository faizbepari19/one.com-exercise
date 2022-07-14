const users = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = app => {

  router.post("/sign_up", users.signUp);

  router.post("/login", users.login);


  app.use('/api/users', router);
};
