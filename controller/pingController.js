// backend/controller/pingController.js
const { pingServer } = require("../service/pingService");

async function handlePingRequest(req, res) {
  try {
    const data = await pingServer();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handlePingRequest };
