// backend/controller/aiController.js
const { callAIService } = require("../service/aiService");

async function handleAIRequest(req, res) {
  try {
    console.log(req.body);
    const data = await callAIService(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleAIRequest };
