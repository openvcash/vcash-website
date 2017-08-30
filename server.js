const express = require('express')
const favicon = require('serve-favicon')
const next = require('next')
const { useStaticRendering } = require('mobx-react')
const { join } = require('path')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

/** Required server-only stores and utilities. */
const serveDocs = require('./src/stores/serveDocs')
const serveNews = require('./src/stores/serveNews')
const subscribe = require('./src/utilities/newsletter')

/** Use MobX static rendering. */
useStaticRendering(true)

app
  .prepare()
  .then(() => {
    const server = express()

    /** Set favicon. */
    server.use(favicon(join(__dirname, 'static', 'images', 'favicon.ico')))

    /** Serve docs markdown files in JSON on /api/docs. */
    server.get('/api/docs', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(serveDocs.json)
    })

    /** Serve news markdown files in JSON on /api/news. */
    server.get('/api/news', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(serveNews.json)
    })

    /** Serve network crawler data on /api/peers. */
    server.get('/api/peers', (req, res) => {
      return res.sendFile(join(__dirname, 'content', 'peers.json'))
    })

    /** Pass along the id to /docs page. */
    server.get('/docs/:id', (req, res) => {
      app.render(req, res, '/docs', { id: req.params.id })
    })

    /** Serve hard-coded bootstrap contacts on /n. */
    server.get('/n', (req, res) => {
      return res.sendFile(join(__dirname, 'content', 'n.json'))
    })

    /** Pass along the id to /news page. */
    server.get('/news/:id', (req, res) => {
      app.render(req, res, '/news', { id: req.params.id })
    })

    /** Process newsletter subscriptions. */
    server.post('/subscribe', (req, res) => {
      return subscribe(req, res)
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
