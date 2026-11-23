# TaskFlow

Aplicação web para organizar tarefas pessoais, acompanhar atividades e definir prioridades. O projeto utiliza **React e TypeScript** na interface, com integração planejada a uma API em **Node.js/Express** e a um banco de dados **PostgreSQL**.

## Visão geral

O TaskFlow reúne tarefas em um único espaço e prevê a organização de atividades por **status**, **prioridade** e **prazo**. A interface foi pensada para ser simples, responsiva e fácil de utilizar.

**Estado atual:** protótipo visual do frontend. A tela apresenta uma prévia do produto; o cadastro de tarefas, a API e o armazenamento de dados ainda não estão disponíveis.

## Tecnologias

| Camada | Tecnologias | Estado |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite, CSS | Configurado |
| Backend | Node.js, Express | Planejado |
| Banco de dados | PostgreSQL, Prisma | Planejado |
| Testes | Testes de frontend e API, GitHub Actions | Planejado |

## Funcionalidades previstas

- Criar, visualizar, editar e excluir tarefas.
- Definir título, descrição, prioridade e prazo.
- Organizar tarefas por **A fazer**, **Em andamento** e **Concluída**.
- Filtrar tarefas por status e prioridade.
- Visualizar atividades em um quadro Kanban.
- Salvar tarefas em banco de dados.
- Validar dados e tratar erros na API.
- Cobrir as principais operações com testes automatizados.

## Como executar

**Pré-requisitos:** Node.js compatível com o Vite e npm.

No terminal, a partir da raiz do repositório:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço informado no terminal (normalmente `http://localhost:5173`).

Para verificar a compilação:

```bash
npm run build
```

Para visualizar localmente o resultado da compilação:

```bash
npm run preview
```

## Estrutura do projeto

```text
taskflow/
├── frontend/
│   ├── public/
│   │   └── taskflow.svg
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── arquivos de configuração
├── .editorconfig
├── .gitignore
└── README.md
```

## Objetivo técnico

Exercitar a criação de interfaces com componentes reutilizáveis, o consumo e o desenvolvimento de APIs REST, a modelagem de dados, o versionamento com Git e a escrita de testes de software.
