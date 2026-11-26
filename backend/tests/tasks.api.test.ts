import assert from 'node:assert/strict'
import type { AddressInfo } from 'node:net'
import { test } from 'node:test'
import { createApp } from '../src/app.js'
import { TaskStore } from '../src/tasks/taskStore.js'

async function withApi(run: (url: string) => Promise<void>): Promise<void> {
  // Uma instância nova evita que os testes compartilhem tarefas.
  const app = createApp(new TaskStore())
  const server = app.listen(0, '127.0.0.1')

  try {
    await new Promise<void>((resolve, reject) => {
      server.once('listening', resolve)
      server.once('error', reject)
    })

    const { port } = server.address() as AddressInfo
    await run(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
}

async function postTask(url: string, body: unknown) {
  return fetch(`${url}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

test('GET /api/tasks retorna lista vazia inicialmente', async () => {
  await withApi(async (url) => {
    const response = await fetch(`${url}/api/tasks`)

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), [])
  })
})

test('POST /api/tasks cria tarefa e GET retorna a tarefa criada', async () => {
  await withApi(async (url) => {
    const response = await postTask(url, {
      title: '  Estudar Express  ',
      description: 'Ler sobre rotas',
      priority: 'high',
      dueDate: '2026-12-10',
    })

    assert.equal(response.status, 201)
    const created = await response.json() as Record<string, unknown>
    assert.equal(created.title, 'Estudar Express')
    assert.equal(created.description, 'Ler sobre rotas')
    assert.equal(created.status, 'todo')
    assert.equal(created.priority, 'high')
    assert.equal(created.dueDate, '2026-12-10')
    assert.equal(typeof created.id, 'string')
    assert.equal(typeof created.createdAt, 'string')
    assert.equal(typeof created.updatedAt, 'string')

    const listResponse = await fetch(`${url}/api/tasks`)
    assert.equal(listResponse.status, 200)
    assert.deepEqual(await listResponse.json(), [created])
  })
})

test('POST /api/tasks aplica valores padrão', async () => {
  await withApi(async (url) => {
    const response = await postTask(url, { title: 'Nova tarefa' })
    const created = await response.json() as Record<string, unknown>

    assert.equal(response.status, 201)
    assert.equal(created.description, '')
    assert.equal(created.priority, 'medium')
    assert.equal(created.status, 'todo')
    assert.equal(created.dueDate, null)
  })
})

test('POST /api/tasks rejeita dados inválidos sem salvar tarefa', async () => {
  await withApi(async (url) => {
    const invalidInputs = [
      null,
      [],
      {},
      { title: '   ' },
      { title: 42 },
      { title: 'a'.repeat(121) },
      { title: 'Teste', description: 3 },
      { title: 'Teste', priority: 'urgent' },
      { title: 'Teste', status: 'waiting' },
      { title: 'Teste', dueDate: '2026-02-30' },
    ]

    for (const input of invalidInputs) {
      const response = await postTask(url, input)
      assert.equal(response.status, 400, `Entrada inválida aceita: ${JSON.stringify(input)}`)
      const body = await response.json() as Record<string, unknown>
      assert.equal(typeof body.error, 'string')
    }

    const listResponse = await fetch(`${url}/api/tasks`)
    assert.deepEqual(await listResponse.json(), [])
  })
})
