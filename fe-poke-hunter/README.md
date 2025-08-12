# 🌤️ PokeHunter Frontend

Este é o **frontend** do projeto **PokeHunter**, desenvolvido em **Next.js** com **TypeScript** e **TailwindCSS**.  
Ele é responsável por permitir que o usuário informe uma cidade, consultar a API do backend e exibir:

- Temperatura atual da cidade (°C)
- Condição climática (chuva ou não)
- Nome e imagem do Pokémon correspondente à regra do clima

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) — Framework React para aplicações web modernas
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para maior confiabilidade
- [Tailwind CSS](https://tailwindcss.com/) — Estilização rápida e responsiva
- [Axios](https://axios-http.com/) — Cliente HTTP para comunicação com o backend

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Flavio-JS/poke-hunter.git
cd fe-poke-hunter/
```

### 2️⃣ Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto `fe-poke-hunter` com:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### 4️⃣ Rodar o servidor de desenvolvimento
No arquivo `package.json` está configurado para o o projeto rodar na porta `3001`, altere caso necessário e lembre-se de ajustar a url do front em `api-poke-hunter`

```bash
npm run dev
# ou
yarn dev
```

