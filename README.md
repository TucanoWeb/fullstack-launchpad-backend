# Backend do Full-Stack Launchpad AI Pro 🚀

O **Full-Stack Launchpad AI Pro - Backend** é o núcleo seguro e inteligente que conecta seu frontend à inteligência artificial (OpenAI ou Gemini), protegendo suas chaves e endpoints. Ele atua como um proxy robusto, garantindo que nenhuma informação sensível seja exposta ao usuário final.

## O que é este projeto?

Este backend foi criado para ser a ponte entre aplicações web modernas e provedores de IA generativa, permitindo a geração de boilerplates completos, guias técnicos e automações para desenvolvedores. Ele recebe prompts do frontend, consulta a IA, trata e valida o retorno, e entrega respostas seguras e prontas para uso.

- **Repositório:** [https://github.com/TucanoWeb/fullstack-launchpad-backend.git](https://github.com/TucanoWeb/fullstack-launchpad-backend.git)

## Principais funcionalidades

- 🔒 **Proxy seguro** para APIs de IA (OpenAI/Gemini)
- 🧠 **Validação e tratamento** do retorno da IA (garante JSON válido e seguro)
- 🌐 **CORS configurável** para múltiplos ambientes
- ⚡ **Pronto para deploy** em Vercel, Render, Railway, etc.
- 🛠️ **Estrutura modular** (controllers, services) para fácil manutenção e expansão
- 📦 **Pronto para integração** com qualquer frontend moderno

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Vercel](https://vercel.com/) (deploy recomendado)

## Como rodar localmente

1. Instale as dependências:

```bash
cd backend
npm install
```

2. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

3. Edite `.env` e insira sua chave e endpoint da IA.

4. Inicie o backend:

```bash
npm run dev
```

O backend rodará por padrão em `http://localhost:3001`.

## Como contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`
3. Faça suas alterações e commits
4. Envie um pull request explicando sua contribuição
5. Participe das discussões e ajude a melhorar o projeto!

Sugestões, issues e feedbacks são super bem-vindos!

---

> Nunca exponha suas chaves de API no frontend. Use sempre este backend como camada de proteção!
