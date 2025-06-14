// backend/service/aiService.js
async function pingServer() {
  // Simula uma chamada de ping ao servidor
  return {
    status: "success",
    message: "Server is up and running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
}

module.exports = { pingServer };
