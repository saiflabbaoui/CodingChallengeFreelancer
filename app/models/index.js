const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: 0,
    port:5433,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.freelancer = require("./freelancer.model.js")(sequelize, Sequelize);

db.project = require("./project.model.js")(sequelize, Sequelize);

db.freelancer.belongsToMany(db.project, {
    through: 'project_freelancer',
    as: 'project',
    foreignKey: 'freelancer_id',
  });
  db.project.belongsToMany(db.freelancer, {
    through: 'project_freelancer',
    as: 'freelancer',
    foreignKey: 'project_id',
  });
module.exports = db;