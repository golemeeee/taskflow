# TaskFlow

Aplicação para organizar tarefas. O frontend é feito em React e TypeScript, e o backend usa Express.

## Tecnologias

- React, TypeScript, Vite e CSS
- Node.js e Express

## Executar

É necessário ter Node.js e npm instalados.

Para abrir o frontend, na pasta `taskflow`:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Em outro terminal, na pasta `taskflow`:

```bash
cd backend
npm install
npm run dev
```

A API roda em `http://localhost:3001`. A rota `GET /health` retorna:

```json
{"status":"ok","service":"taskflow-api"}
```

## Testes

Na pasta `backend`:

```bash
npm test
npm run build
```

Os testes verificam a rota `/health` e o armazenamento temporário de tarefas.

## Organização

```text
taskflow/
├── frontend/
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── task.ts
│   │   │   └── taskStore.ts
│   │   ├── app.ts
│   │   └── server.ts
│   └── tests/
├── .gitignore
└── README.md
```

## Estado atual

O frontend ainda é uma interface de apresentação. No backend, já existe o modelo `Task`, com título, descrição, status, prioridade, prazo e datas de criação e atualização.

A classe `TaskStore` permite criar, listar e localizar tarefas em memória. Os dados são perdidos quando o processo termina. Essas operações ainda não estão disponíveis por rotas HTTP; por enquanto, a única rota pública é `GET /health`.
