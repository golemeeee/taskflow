# TaskFlow

Aplicação de organização de tarefas feita com React e TypeScript. O frontend mostra uma prévia do quadro de tarefas, e o backend já conta com um servidor Express.

## Tecnologias

- **Frontend:** React, TypeScript, Vite e CSS
- **Backend:** Node.js, Express e TypeScript

## Como rodar

É necessário ter Node.js e npm instalados.

Abra um terminal na pasta do projeto e inicie o frontend:

```bash
cd frontend
npm install
npm run dev
```

O site abre normalmente em `http://localhost:5173`.

Em outro terminal, a partir da pasta principal do projeto, inicie a API:

```bash
cd backend
npm install
npm run dev
```

A API roda em `http://localhost:3001`. Para conferir se o servidor está respondendo, abra `http://localhost:3001/health`. O retorno esperado é:

```json
{"status":"ok","service":"taskflow-api"}
```

## Testes

Para executar o teste da rota `/health`:

```bash
cd backend
npm test
```

Para verificar a compilação do backend:

```bash
npm run build
```

## Estrutura

```text
taskflow/
├── frontend/     # Interface React
├── backend/
│   ├── src/      # Configuração e inicialização do servidor
│   └── tests/    # Testes da API
├── .gitignore
└── README.md
```

## Situação atual

O frontend ainda é uma prévia visual: não é possível cadastrar tarefas por enquanto. A API possui a rota `GET /health`, usada para verificar se o servidor está funcionando. O frontend ainda não faz requisições ao backend e os dados ainda não são armazenados em banco.
