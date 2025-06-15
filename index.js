require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { handleAIRequest } = require("./controller/aiController");
const { handlePingRequest } = require("./controller/pingController");
const aiBoilerplateController = require("./controller/aiBoilerplateController");
const sequelize = require("./models/sequelize");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_DOMAIN }));
app.use(express.json());

// app.post("/api/v1/ai", handleAIRequest);
app.get("/api/v1/ping", handlePingRequest);
app.post("/api/v1/ai", aiBoilerplateController.createBoilerplateRequest);
app.get("/api/v1/ai/:id", aiBoilerplateController.getBoilerplateRequest);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
});
