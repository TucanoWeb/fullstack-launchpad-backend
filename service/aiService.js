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

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
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
      let sections = {};
      try {
        sections = JSON.parse(content);
      } catch (e) {
        console.error("Falha ao fazer parse do JSON retornado pela API (tentativa " + attempt + "):", content);
        throw new Error("O retorno da API não pôde ser interpretado como JSON válido.");
      }
      return { sections };
    } catch (error) {
      lastError = error;
      console.error(`Tentativa ${attempt} falhou:`, error.message);
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt)); // backoff
      }
    }
  }
  throw lastError || new Error("Falha ao se comunicar com a API após 3 tentativas.");
}

module.exports = { callAIService };
