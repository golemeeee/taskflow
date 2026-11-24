import assert from 'node:assert/strict'
import type { AddressInfo } from 'node:net'
import { test } from 'node:test'
import app from '../src/app.js'

test('GET /health retorna o status da API', async () => {
  const server = app.listen(0, '127.0.0.1')

  try {
    await new Promise<void>((resolve, reject) => {
      server.once('listening', resolve)
      server.once('error', reject)
    })

    const { port } = server.address() as AddressInfo
    const response = await fetch(`http://127.0.0.1:${port}/health`)

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), {
      status: 'ok',
      service: 'taskflow-api',
    })
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
})
