const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_roles',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    }
  });

  User.validPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }

  User.getUser = (username) => {
    return User.findAll({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('username')),
        sequelize.fn('lower', username)
      )
    })
  }

  User.registerUser = (user) => {
    return User.create(user);
  }

  User.getUserById = (id) => {
    return User.findOne({
      where: {
        id: id,
      }
    })
  }


  return User;
};
