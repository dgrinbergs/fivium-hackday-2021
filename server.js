let express = require('express')
let socket = require('socket.io')

// App setup
let app = express()
const port = 8080
let server = app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})

app.use(express.static('static'))

let users = new Map()

let io = socket(server)
io.on('connection', socket => {
  io.to(socket.id).emit('members', Array.from(users.values()))

  socket.on('disconnect', () => {
    if (users.has(socket.id)) {
      let name = users.get(socket.id)

      io.sockets.emit('unregister', name)
      console.log(`Disonnected: ${name}`)

      users.delete(socket.id)
      console.log(users)
    }
  })

  socket.on('register', name => {
    users.set(socket.id, name)
    io.sockets.emit('register', name)

    console.log(`Registered: ${name}`)
    console.log(users)
  })

  socket.on('unregister', () => {
    let name = users.get(socket.id)
    io.sockets.emit('unregister', name)
    users.delete(socket.id)

    console.log(`Unregistered: ${name}`)
    console.log(users)
  })
})