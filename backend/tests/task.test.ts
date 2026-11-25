import assert from 'node:assert/strict'
import { test } from 'node:test'
import { TaskStore } from '../src/tasks/taskStore.js'

test('cria uma tarefa com valores padrão', () => {
  const store = new TaskStore()
  const task = store.create({ title: 'Estudar TypeScript' })

  assert.match(task.id, /^[0-9a-f-]{36}$/i)
  assert.equal(task.title, 'Estudar TypeScript')
  assert.equal(task.description, '')
  assert.equal(task.status, 'todo')
  assert.equal(task.priority, 'medium')
  assert.equal(task.dueDate, null)
  assert.ok(!Number.isNaN(Date.parse(task.createdAt)))
  assert.equal(task.updatedAt, task.createdAt)
})

test('guarda e consulta tarefas na memória', () => {
  const store = new TaskStore()
  const task = store.create({
    title: 'Revisar algoritmos',
    description: 'Resolver três exercícios',
    status: 'doing',
    priority: 'high',
    dueDate: '2026-12-10',
  })

  assert.deepEqual(store.getAll(), [task])
  assert.deepEqual(store.getById(task.id), task)
  assert.equal(store.getById('id-inexistente'), undefined)
})

test('não permite alterar a memória interna pela resposta', () => {
  const store = new TaskStore()
  const created = store.create({ title: 'Tarefa original' })
  created.title = 'Alterada fora do armazenamento'

  const listed = store.getAll()
  listed[0].title = 'Outra alteração'

  assert.equal(store.getById(created.id)?.title, 'Tarefa original')
})

test('cada instância possui sua própria lista', () => {
  const first = new TaskStore()
  const second = new TaskStore()
  first.create({ title: 'Somente na primeira lista' })

  assert.equal(first.getAll().length, 1)
  assert.deepEqual(second.getAll(), [])
})
