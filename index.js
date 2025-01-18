const express = require('express')
const path = require('path')

const port = process.env.PORT || 5006

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log(`Rendering 'pages/index' for route '/'`)
  res.render('pages/index')
})

app.get('/env', (req, res) => {
	console.log(process.env.TEST_KEY)
    res.setHeader('Content-Type', 'application/json');
	result = {
		a: 1,
		env: process.env.TEST_KEY
	}
    res.end(JSON.stringify(result));
})

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down')
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }
})
