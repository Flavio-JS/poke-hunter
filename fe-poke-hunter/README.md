# 🌤️ PokeHunter Frontend

Este é o **frontend** do projeto **PokeHunter**, desenvolvido em **Next.js** com **TypeScript** e **TailwindCSS**.  
Ele permite que o usuário informe uma cidade, consulte a API do backend e visualize:

- 🌡️ **Temperatura atual** (°C)
- ☔ **Condição climática** (chuva ou não)
- 🎯 **Pokémon correspondente** de acordo com as regras do clima, com nome e imagem
- 📜 **Histórico de Consultas** — Lista das últimas cidades pesquisadas com seus respectivos Pokémons
- ⚔️ **Efetividade em Batalha** — Mostra contra quais tipos o Pokémon é **forte** e **fraco**

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React para aplicações web modernas
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para maior confiabilidade
- [Tailwind CSS](https://tailwindcss.com/) — Estilização rápida e responsiva
- [Axios](https://axios-http.com/) — Cliente HTTP para comunicação com o backend
- [React Query](https://tanstack.com/query/latest) — Gerenciamento e cache de dados de API
- [Font Awesome](https://fontawesome.com/) — Ícones vetoriais personalizáveis
- [Radix UI](https://www.radix-ui.com/) — Componentes acessíveis e personalizáveis

---

## ⚙️ Como Executar o Projeto

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

> ⚠️ Lembre-se de ajustar esta URL caso o backend esteja hospedado em outro endereço.

### 4️⃣ Rodar o servidor de desenvolvimento
Por padrão, o projeto está configurado para rodar na **porta 3001** (veja `package.json`).  
Se alterar a porta, também ajuste a URL do frontend configurada no `api-poke-hunter` (backend).

```bash
npm run dev
# ou
yarn dev
```

### 5️⃣ Gerar versão de produção
```bash
npm run build
npm run start
```

---

## 📂 Estrutura do Projeto

```bash
fe-poke-hunter/
├───public
└───src
    ├───api
    │   ├───hooks
    │   ├───services
    │   └───types
    ├───app
    ├───components
    │   ├───Footer
    │   ├───Header
    │   ├───HistorySection
    │   ├───BattleEffectivenessSection
    │   ├───InstructionsSection
    │   ├───PokemonCard
    │   ├───SearchSection
    │   ├───ui
    │   └───WeatherCard
    ├───contexts
    ├───hooks
    ├───lib
    ├───providers
    └───utils
```

---

## 🧪 Qualidade e Padronização

O projeto utiliza:

- **ESLint** para análise estática de código
- **Prettier** com plugin TailwindCSS para formatação
- **TypeScript** para segurança de tipos

---

## 📜 Licença
Este projeto está sob a licença MIT.  
Sinta-se livre para usar, modificar e distribuir.

---
