const express = require('express')
const next = require('next')
const { join } = require('path')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

/** Required stores. */
const news = require('./src/stores/news.js')

app
  .prepare()
  .then(() => {
    const server = express()

    /** Serve news markdown files in JSON on /api/news. */
    server.get('/api/news', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(news.json)
    })

    /** Serve network crawler data on /api/peers. */
    server.get('/api/peers', (req, res) => {
      return res.sendFile(join(__dirname, 'content', 'peers.json'))
    })

    /** Serve hard-coded bootstrap contacts on /n. */
    server.get('/n', (req, res) => {
      return res.sendFile(join(__dirname, 'content', 'n.json'))
    })

    /** Serve individual news markdown files on /news/:id */
    server.get('/news/:id', (req, res) => {
      app.render(req, res, '/news', { id: req.params.id })
    })

    /** Pass everything else to app request handler. */
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    /** Listen on default port 3000 or provided port. */
    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
