module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define("permission", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(32)
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
  });

  return Permission;
};
