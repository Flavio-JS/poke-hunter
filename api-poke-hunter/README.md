# ⚡ PokeHunter API

API backend do projeto **PokeHunter**, desenvolvida com **NestJS** e **TypeScript**.  
Ela integra dados da **OpenWeather API** e da **PokéAPI** para retornar:

- 🌡️ **Informações climáticas** de uma cidade
- 🎯 **Pokémon correspondente** de acordo com o clima
- 📜 **Histórico de Consultas** — Retorna as últimas cidades pesquisadas com seus Pokémons
- ⚔️ **Efetividade em Batalha** — Lista tipos de Pokémon contra os quais ele é forte ou fraco

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework Node.js para construção de APIs escaláveis
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para maior confiabilidade
- [Axios](https://axios-http.com/) — Cliente HTTP para integração com APIs externas
- [Class Validator](https://github.com/typestack/class-validator) — Validação de dados
- [Class Transformer](https://github.com/typestack/class-transformer) — Transformação de objetos
- [RxJS](https://rxjs.dev/) — Programação reativa

---

## 📦 Estrutura do Projeto

```bash
api-poke-hunter-nestjs/
├── src/
│   ├── common/interfaces/       # Interfaces para APIs externas
│   ├── modules/
│   │   ├── pokemon/              # Módulo responsável pela lógica dos Pokémons
│   │   └── weather/              # Módulo responsável pela lógica do clima
│   ├── app.module.ts             # Módulo raiz
│   └── main.ts                   # Ponto de entrada da aplicação
├── test/                         # Testes E2E
├── .env                          # Variáveis de ambiente
├── .env.example                  # Exemplo de variáveis de ambiente
└── package.json
```

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Flavio-JS/poke-hunter.git
cd api-poke-hunter/
```

### 2️⃣ Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example` na raiz do projeto:

```env
OPEN_WEATHER_API_KEY=""
OPEN_WEATHER_BASE_URL="https://api.openweathermap.org/data/2.5"
POKE_API_BASE_URL="https://pokeapi.co/api/v2"
FRONTEND_URL="http://localhost:3001"
PORT=3000
```

> ⚠️ É necessário ter uma chave válida da **OpenWeather API** para executar o projeto.

### 4️⃣ Rodar o servidor de desenvolvimento

```bash
npm run start:dev
```

### 5️⃣ Rodar o servidor em produção

```bash
npm run build
npm run start:prod
```

---

## 📜 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para usar, modificar e distribuir.
