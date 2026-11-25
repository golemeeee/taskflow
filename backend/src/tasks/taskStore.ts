import { randomUUID } from 'node:crypto'
import type { CreateTaskInput, Task } from './task.js'

export class TaskStore {
  private tasks: Task[] = []

  getAll(): Task[] {
    return this.tasks.map((task) => ({ ...task }))
  }

  getById(id: string): Task | undefined {
    const task = this.tasks.find((item) => item.id === id)
    return task ? { ...task } : undefined
  }

  create(input: CreateTaskInput): Task {
    const now = new Date().toISOString()

    const task: Task = {
      id: randomUUID(),
      title: input.title,
      description: input.description ?? '',
      status: input.status ?? 'todo',
      priority: input.priority ?? 'medium',
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    }

    this.tasks.push(task)
    return { ...task }
  }
}

export const taskStore = new TaskStore()
