// backend/db.js
// Removido: Pool do pg
const sequelize = require('./sequelize');
const BoilerplateRequest = require('./models/BoilerplateRequest');

module.exports = {
  sequelize,
  BoilerplateRequest,
};
