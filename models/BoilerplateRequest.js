// backend/models/BoilerplateRequest.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const BoilerplateRequest = sequelize.define(
  "ai_boilerplate_requests",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    overview: DataTypes.TEXT,
    tech_rationale: DataTypes.TEXT,
    directory_structure: DataTypes.TEXT,
    frontend_guide: DataTypes.TEXT,
    backend_guide: DataTypes.TEXT,
    database_guide: DataTypes.TEXT,
    docker_guide: DataTypes.TEXT,
    next_steps: DataTypes.TEXT,
    error: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = BoilerplateRequest;
