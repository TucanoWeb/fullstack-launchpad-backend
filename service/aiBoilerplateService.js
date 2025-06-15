// backend/service/aiBoilerplateService.js
const { BoilerplateRequest } = require("../models/db");
const { v4: uuidv4 } = require("uuid");

async function createRequest(prompt) {
  const id = uuidv4();
  const req = await BoilerplateRequest.create({ id, prompt, status: "pending" });
  return req.toJSON();
}

async function updateRequestPart(id, part, value) {
  const req = await BoilerplateRequest.findByPk(id);
  if (!req) throw new Error('Requisição não encontrada');
  // Se value não for string, faz stringificação
  let toSave = value;
  if (typeof value !== 'string') {
    toSave = JSON.stringify(value);
  }
  req[part] = toSave;
  req.updated_at = new Date();
  await req.save();
  return req.toJSON();
}

async function updateRequestStatus(id, status, error = null) {
  const req = await BoilerplateRequest.findByPk(id);
  if (!req) throw new Error("Requisição não encontrada");
  req.status = status;
  req.error = error;
  req.updated_at = new Date();
  await req.save();
  return req.toJSON();
}

async function getRequest(id) {
  const req = await BoilerplateRequest.findByPk(id);
  return req ? req.toJSON() : null;
}

module.exports = {
  createRequest,
  updateRequestPart,
  updateRequestStatus,
  getRequest,
};
