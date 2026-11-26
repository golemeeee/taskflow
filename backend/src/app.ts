import cors from 'cors'
import express from 'express'
import { createTaskRouter } from './tasks/taskRoutes.js'
import { taskStore } from './tasks/taskStore.js'
import type { TaskStore } from './tasks/taskStore.js'

export function createApp(store: TaskStore = taskStore) {
  const app = express()

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'taskflow-api' })
  })

  app.use('/api/tasks', createTaskRouter(store))

  return app
}

export default createApp()
