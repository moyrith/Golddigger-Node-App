import path from 'node:path'
import fs from 'fs/promises'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'


export async function serveStatic(req, res, baseDir) {
  const publicDir = path.join(baseDir, 'public')
  const pathToResource = path.join(
  publicDir,
  req.url === '/' ? 'index.html' : req.url)

  const ext = path.extname(pathToResource)

  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(pathToResource)
    sendResponse(res, 200, contentType, content)
    return true
  } catch(err) {
    if(err.code === 'ENOENT') {
      const content = await fs.readFile(path.join(publicDir, '404.html'))
      sendResponse(res, 404, 'text/html', content)
      return true
    } else {
      sendResponse(res, 500, 'text/html', '<html><h1>Server Error: ${err.code}</h1></html>')
      return true
    }
  }
}