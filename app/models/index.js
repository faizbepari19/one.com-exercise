const env = 'staging';
const dbConfig = require("../config/config.json")[env];
console.log(dbConfig)

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_roles = require("./user_role.model.js")(sequelize, Sequelize);
db.permissions = require("./permission.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js")(sequelize, Sequelize);
db.user_role_permissions = require("./user_role_permission.model.js")(sequelize, Sequelize);



module.exports = db;
