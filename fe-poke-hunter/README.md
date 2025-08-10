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

## 📋 Funcionalidades

- Formulário para buscar cidade
- Exibição da temperatura, clima e Pokémon sugerido
- Renderização da imagem do Pokémon (extra)
- Tratamento de erros e mensagens amigáveis

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/pokehunter-frontend.git
cd pokehunter-frontend
```

### 2️⃣ Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto com:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### 4️⃣ Rodar o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

---

## 🐳 Executando com Docker (opcional)
```bash
docker build -t pokehunter-frontend .
docker run -p 3001:3000 pokehunter-frontend
```

---

## 📷 Exemplo de Tela
![Tela do PokeHunter](docs/screenshot.png)

---

## 📜 Licença
Este projeto está sob a licença MIT.
