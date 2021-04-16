let express = require('express')

// App setup
let app = express()
const port = 8080
let server = app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})

require('./sockets.js')(server) //all the websocket stuff

app.use(express.static('static'))