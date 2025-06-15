// backend/sequelize.js
const Sequelize = require("sequelize");
require("dotenv").config();

const connectionString = encodeURI(process.env.SUPABASE_DB_URL || "");

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    timezone: "-03:00",
  },
});

module.exports = sequelize;
