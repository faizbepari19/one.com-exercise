module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("user_role", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(32)
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
  });

  UserRole.getRoleById = (id) => {
    return UserRole.findOne({
      where: {
        id: id,
        status: 1
      }
    })
  }

  return UserRole;
};
