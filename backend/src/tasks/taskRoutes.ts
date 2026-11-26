import { Router } from 'express'
import type { CreateTaskInput, TaskPriority, TaskStatus } from './task.js'
import type { TaskStore } from './taskStore.js'

const statuses: TaskStatus[] = ['todo', 'doing', 'done']
const priorities: TaskPriority[] = ['low', 'medium', 'high']

type ParseResult =
  | { ok: true; value: CreateTaskInput }
  | { ok: false; error: string }

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

function parseTaskInput(body: unknown): ParseResult {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Envie um objeto JSON com os dados da tarefa.' }
  }

  const data = body as Record<string, unknown>

  if (typeof data.title !== 'string' || !data.title.trim()) {
    return { ok: false, error: 'O título é obrigatório.' }
  }

  const title = data.title.trim()
  if (title.length > 120) {
    return { ok: false, error: 'O título deve ter no máximo 120 caracteres.' }
  }

  const input: CreateTaskInput = { title }

  if (data.description !== undefined) {
    if (typeof data.description !== 'string' || data.description.length > 1000) {
      return { ok: false, error: 'A descrição deve ser um texto de até 1000 caracteres.' }
    }
    input.description = data.description.trim()
  }

  if (data.status !== undefined) {
    if (!statuses.includes(data.status as TaskStatus)) {
      return { ok: false, error: 'Status inválido. Use todo, doing ou done.' }
    }
    input.status = data.status as TaskStatus
  }

  if (data.priority !== undefined) {
    if (!priorities.includes(data.priority as TaskPriority)) {
      return { ok: false, error: 'Prioridade inválida. Use low, medium ou high.' }
    }
    input.priority = data.priority as TaskPriority
  }

  if (data.dueDate !== undefined) {
    if (data.dueDate !== null && (typeof data.dueDate !== 'string' || !isValidDate(data.dueDate))) {
      return { ok: false, error: 'O prazo deve estar no formato AAAA-MM-DD ou ser null.' }
    }
    input.dueDate = data.dueDate as string | null
  }

  return { ok: true, value: input }
}

export function createTaskRouter(store: TaskStore): Router {
  const router = Router()

  router.get('/', (_req, res) => {
    res.json(store.getAll())
  })

  router.post('/', (req, res) => {
    const parsed = parseTaskInput(req.body as unknown)
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error })
      return
    }

    const task = store.create(parsed.value)
    res.status(201).json(task)
  })

  return router
}
