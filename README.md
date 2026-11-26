# TaskFlow

Aplicação de gerenciamento de tarefas feita com React, TypeScript e Express.

O frontend apresenta a interface do projeto. No backend, já é possível criar e listar tarefas por uma API HTTP. Por enquanto, as tarefas ficam na memória e são apagadas quando o servidor é reiniciado.

## Tecnologias

- React, TypeScript, Vite e CSS no frontend
- Node.js, Express e TypeScript no backend
- Testes com `node:test`

## Executar

É necessário ter Node.js e npm instalados.

**Frontend:** abra um terminal na pasta principal do projeto e execute:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

**Backend:** abra outro terminal na pasta principal e execute:

```bash
cd backend
npm install
npm run dev
```

A API fica disponível em `http://localhost:3001`.

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica se o servidor está ativo |
| GET | `/api/tasks` | Lista as tarefas cadastradas |
| POST | `/api/tasks` | Cadastra uma tarefa |

### Exemplo: criar uma tarefa

Envie uma requisição `POST` para `http://localhost:3001/api/tasks` com o corpo JSON:

```json
{
  "title": "Estudar TypeScript",
  "description": "Revisar interfaces",
  "priority": "high",
  "dueDate": "2026-12-10"
}
```

O servidor retorna o objeto criado com **HTTP 201**, incluindo `id`, `status`, `createdAt` e `updatedAt`.

O campo `title` é obrigatório (de 1 a 120 caracteres após remover espaços das pontas). Os demais são opcionais:

- `description`: texto com até 1000 caracteres;
- `priority`: `low`, `medium` ou `high` (padrão: `medium`);
- `status`: `todo`, `doing` ou `done` (padrão: `todo`);
- `dueDate`: data real no formato `AAAA-MM-DD` ou `null` (padrão: `null`).

Se os dados forem inválidos, a API retorna **HTTP 400** com uma mensagem no campo `error`.

### Testar no PowerShell

Com o backend rodando, em um terminal separado:

```powershell
Invoke-RestMethod http://localhost:3001/api/tasks

$dados = @{
  title = "Estudar TypeScript"
  priority = "high"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3001/api/tasks -Method Post -ContentType "application/json" -Body $dados

Invoke-RestMethod http://localhost:3001/api/tasks
```

## Testes

Na pasta `backend`:

```bash
npm test
npm run build
```

Os testes verificam o servidor, o armazenamento em memória e as rotas da API.

## Estrutura

```text
taskflow/
├── frontend/
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── task.ts
│   │   │   ├── taskStore.ts
│   │   │   └── taskRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   └── tests/
├── .gitignore
└── README.md
```

## Limitações atuais

- O frontend ainda não faz requisições para a API.
- As tarefas são mantidas apenas em memória, sem banco de dados.
- Ainda não existem rotas HTTP para editar ou excluir tarefas.
