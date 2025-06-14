// backend/service/aiService.js
const axios = require("axios");
require("dotenv").config();

async function callAIService({ prompt }) {
  const requestBody = {
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente de IA especialista em gerar estruturas de projeto (boilerplates) e guias detalhados para desenvolvimento full-stack. O RETORNO DEVE SER EXCLUSIVAMENTE UM JSON VÁLIDO, sem texto antes ou depois.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 7000,
    temperature: 0.6,
    top_p: 0.95,
  };

  try {
    const response = await fetch(process.env.OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error("Erro da API:", errorData);
      throw new Error(
        `Erro da API OpenAI: ${response.status} ${errorData.error?.message || errorData.message || response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
      console.error("Resposta inesperada da API:", data);
      throw new Error("A API não retornou o conteúdo esperado.");
    }

    let content = data.choices[0].message.content.trim();
    content = content.replace(/^```json[\s\n]*|^```[\s\n]*|```$/gim, "").trim();

    content = content.replace(/^```json[\s\n]*|^```[\s\n]*|```$/gim, "").trim();
    let sections = {};
    try {
      sections = JSON.parse(content);
    } catch (e) {
      console.error("Falha ao fazer parse do JSON retornado pela API:", content);
      throw new Error("O retorno da API não pôde ser interpretado como JSON válido.");
    }
    return { sections };
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    if (error instanceof Error && error.message.startsWith("Erro da API:")) {
      throw error;
    }
    throw new Error("Falha ao se comunicar com a API. Verifique a conexão e as configurações do endpoint.");
  }
}

module.exports = { callAIService };
