import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import fs from 'fs/promises'

const PORT = process.env.PORT || 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')


  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url === '/log-transaction' && req.method === 'POST') {
    console.log('Handling log-transaction POST request')
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        const logEntry = `${new Date().toISOString()} - Amount: £${data.amount}, Ounces: ${data.ounces}\n`

        await fs.appendFile('golddigger-transaction-log.txt', logEntry)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Transaction logged successfully' }))
      } catch (err) {
        console.error('Error processing transaction:', err)

        if (err instanceof SyntaxError) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Invalid JSON' }))
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Failed to log transaction' }))
        }
      }
    })
    return
  }

  console.log('Serving static file for:', req.url)
  await serveStatic(req, res, __dirname)
})

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})