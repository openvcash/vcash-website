const express = require('express')
const icon = require('serve-favicon')
const next = require('next')
const { useStaticRendering } = require('mobx-react')
const { join } = require('path')

/** Initialize Next.js. */
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

/** Required server-only store. */
const serveContents = require('./stores/serveContents.js')

/** Use MobX static rendering. */
useStaticRendering(true)

/** Start and configure the Express server routes. */
app
  .prepare()
  .then(() => {
    const server = express()

    /** Set a public directory with contents accessible on /. */
    server.use(express.static('public'))

    /** Set the favicon. */
    server.use(icon(join(__dirname, '..', 'static', 'images', 'favicon.ico')))

    /** Allow data fetching from localhost:3000 to hostname:80. */
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      next()
    })

    /** Serve docs markdown files on /api/docs. */
    server.get('/api/docs', (req, res) => res.end(serveContents.docs))

    /** Serve news markdown files on /api/news. */
    server.get('/api/news', (req, res) => res.end(serveContents.news))

    /** Serve network crawler data on /api/peers. */
    server.get('/api/peers', (req, res) => res.end(serveContents.peers))

    /** Serve hard-coded bootstrap contacts on /n. */
    server.get('/n', (req, res) => res.end(serveContents.n))

    /** Pass along the id to /docs page. */
    server.get('/docs/:id', (req, res) => {
      app.render(req, res, '/docs', { id: req.params.id })
    })

    /** Pass along the id to /news page. */
    server.get('/news/:id', (req, res) => {
      app.render(req, res, '/news', { id: req.params.id })
    })

    /** Pass everything else to the app request handler. */
    server.get('*', (req, res) => handle(req, res))

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
