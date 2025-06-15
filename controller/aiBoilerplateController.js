// backend/controller/aiBoilerplateController.js
const aiBoilerplateService = require("../service/aiBoilerplateService");
const { callAIService } = require("../service/aiService");

const PARTS = [
  { key: "overview", promptKey: "overview" },
  { key: "tech_rationale", promptKey: "techRationale" },
  { key: "directory_structure", promptKey: "directoryStructure" },
  { key: "frontend_guide", promptKey: "frontendGuide" },
  { key: "backend_guide", promptKey: "backendGuide" },
  { key: "database_guide", promptKey: "databaseGuide" },
  { key: "docker_guide", promptKey: "dockerGuide" },
  { key: "next_steps", promptKey: "nextSteps" },
];

async function createBoilerplateRequest(req, res) {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt é obrigatório." });
  try {
    const request = await aiBoilerplateService.createRequest(prompt);
    processPartsAsync(request.id, prompt);
    res.status(202).json({ id: request.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function processPartsAsync(id, prompt) {
  // Chama a IA para cada parte, salva no banco e atualiza status
  await aiBoilerplateService.updateRequestStatus(id, "processing");
  for (const part of PARTS) {
    try {
      const partPrompt = buildPartPrompt(prompt, part.promptKey);
      const result = await callAIService({ prompt: partPrompt });
      await aiBoilerplateService.updateRequestPart(id, part.key, result);
    } catch (err) {
      await aiBoilerplateService.updateRequestStatus(id, "error", err.message);
      return;
    }
  }
  await aiBoilerplateService.updateRequestStatus(id, "done");
}

function buildPartPrompt(basePrompt, partKey) {
  // Adapta o prompt para pedir apenas a parte desejada
  return `${basePrompt}\n\n ${partKey}`;
}

async function getBoilerplateRequest(req, res) {
  const { id } = req.params;
  try {
    const request = await aiBoilerplateService.getRequest(id);
    if (!request) return res.status(404).json({ error: "Requisição não encontrada." });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBoilerplateRequest,
  getBoilerplateRequest,
};
